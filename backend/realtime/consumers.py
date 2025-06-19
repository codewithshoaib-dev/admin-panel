from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json

from .dashboard.dashboard_stats_services import get_dashboard_stats
from asgiref.sync import sync_to_async

from .dashboard.cleaneddata import clean_for_json

class DashboardStatsConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("dashboard_stats", self.channel_name)

        stats_data = await sync_to_async(get_dashboard_stats)()
        cleaned_stats_data = clean_for_json(stats_data)

       
        await self.send_json(cleaned_stats_data)


        await self.channel_layer.group_send(
            "dashboard_stats",
            {
                "type": "send_dashboard_update",
                "data": cleaned_stats_data
            }
        )

        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("dashboard_stats", self.channel_name)
        print(f"Client disconnected: {self.channel_name}")

    async def receive_json(self, content):
        print(f"Received message: {content}")

    async def send_dashboard_update(self, event):
        data = event.get("data")
        if data is not None:
            cleanData = clean_for_json(data)
            await self.send_json(data)
        else:
            print("No data in event")
