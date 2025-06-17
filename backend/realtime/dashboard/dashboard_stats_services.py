from subscriptions.models import UserSubscription, SubscriptionPlans
from django.contrib.auth import get_user_model
from audit.models import AuditLogs
from notifications.models import Notifications

from django.db.models import Count
from django.utils import timezone

from django.db.models.functions import ExtractWeekDay

User = get_user_model()


def get_user_stats():

    now = timezone.now()

    WEEKDAY_NAMES = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday'
        }
    
    """
    Getting the total users registered on each day of the 
    week, starting the week with Sunday
    
    """
    users_registered_on_weekday = list(User.objects.annotate
                                       (weekday=ExtractWeekDay('date_joined'))
                                       .values('weekday').annotate(user_count = Count('id'))
                                       .order_by('weekday'))
    
    counts_by_weekday = {item['weekday']: item['user_count'] for item in users_registered_on_weekday}

    final_weekday_stats = []
    
    for weekday_num in range(1, 8):
        final_weekday_stats.append({
            'weekday': WEEKDAY_NAMES[weekday_num],
            'user_count': counts_by_weekday.get(weekday_num, 0)

        })

     #Setting Sunday as the start of the week
    days_to_subtract = now.weekday() + 1 if now.weekday() != 6 else 0
    start_of_week = now - timezone.timedelta(days=days_to_subtract)
 

    qs = User.objects.filter(date_joined__gte=start_of_week)

    count_new_users_this_week = qs.count()
    new_users_this_week = list(qs.values('id', 'username', 'date_joined'))

    total_users = User.objects.count()   
    
    data = {
        'total_users': total_users,
        'users_this_week': new_users_this_week,
        'users_this_week_count': count_new_users_this_week,
        'user_count_each_weekday': final_weekday_stats,
    }
    
    return data


def get_top_subscription_plans():

    # Getting the most popular subscriptions by users subscribed count
    most_popular_subscription_plans = SubscriptionPlans.objects.annotate(
    user_count=Count('user_subscription')).order_by('-user_count')

    top_subscriptions = []
    total_subscribers = 0
    MRR = 0

    for plan in most_popular_subscription_plans:
        top_subscriptions.append({
            'id': plan.id,
            'name': plan.name,
            'subscribers': plan.user_count
        })
        total_subscribers += plan.user_count


    top_3_subscription_plans = top_subscriptions[:3]
    
    data = {
        "top__subscriptions": top_subscriptions,
        "top_3_subscription_plans": top_3_subscription_plans,
        'total_subscribers': total_subscribers,
    }

    return data

def get_important_notification():
    
    latest_notifications = list(Notifications.objects.order_by('-send_at').values('id', 'message')[:5])

    return latest_notifications
    

def get_important_logs():
    latest_audit_logs = list(AuditLogs.objects.order_by('-created_at').values('id', 'action', 'details', 'user__username', 'created_at')[:5])

    return latest_audit_logs