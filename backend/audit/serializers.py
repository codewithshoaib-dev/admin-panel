from rest_framework import serializers
from .models import AuditLogs

class AuditLogsSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ")
    user = serializers.SerializerMethodField()

    class Meta:
        model = AuditLogs
        fields = '__all__'

    def get_user(self, obj):
        return obj.user.username if obj.user else None
