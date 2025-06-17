from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model

User = get_user_model()

    


class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps())


    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        msg = text_data_json['message']

        await self.send(text_data=json.dumps({
            'response': f'You sent: {msg}'
        }))
