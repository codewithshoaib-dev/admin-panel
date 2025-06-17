from .models import AuditLogs



def CreateAuditLog(user, action, details): 

    AuditLogs.objects.create(
                            user=user,
                            action=action, 
                            details=details)



