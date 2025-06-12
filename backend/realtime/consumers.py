from channels.generic.websocket import AsyncWebsocketConsumer
import json


class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            'message': 'WebSocket connected!'
        }))


    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        msg = text_data_json['message']

        await self.send(text_data=json.dumps({
            'response': f'You sent: {msg}'
        }))
