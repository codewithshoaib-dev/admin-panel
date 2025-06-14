from rest_framework.views import exception_handler
from .models import AuditLogs

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        view = context.get('view', None)
        user = getattr(context['request'], 'user', None)
        
        AuditLogs.objects.create(
            user=user if user.is_owner else None,
            action='Error',
            details=f'Error in {view}: {str(exc)}'
        )

    return response
