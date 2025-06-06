from rest_framework import serializers

from .models import AuditLogs



class AuditLogsSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ")

    class Meta:
        model = AuditLogs
        fields = '__all__'


    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['created_at'] = instance.created_at.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        return ret

