from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model

User = get_user_model()

class Data():
     
     now = timezone.now()
     week_ago = now - timedelta(days=6)
     
     for i in range(7):
            day = (week_ago + timedelta(days=i)).date()


            new_users_this_week = User.objects.filter(
                date_joined__date=day
            )





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
