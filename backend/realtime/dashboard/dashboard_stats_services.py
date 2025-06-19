from subscriptions.models import UserSubscription, SubscriptionPlans
from django.contrib.auth import get_user_model
from audit.models import AuditLogs
from notifications.models import Notifications

from django.db.models import Count, Sum
from django.db.models.functions import ExtractWeekDay, TruncMonth
from django.utils import timezone


from dateutil.relativedelta import relativedelta

User = get_user_model()


def get_user_stats():
    now = timezone.now()

    WEEKDAY_NAMES = {
        1: 'Sunday', 2: 'Monday', 3: 'Tuesday', 4: 'Wednesday',
        5: 'Thursday', 6: 'Friday', 7: 'Saturday'
    }

    users_registered_on_weekday = User.objects.annotate(
        weekday=ExtractWeekDay('date_joined')
    ).values('weekday').annotate(user_count=Count('id')).order_by('weekday')

    counts_by_weekday = {item['weekday']: item['user_count'] for item in users_registered_on_weekday}

    final_weekday_stats = []
    for weekday_num in range(1, 8):
        final_weekday_stats.append({
            'weekday': WEEKDAY_NAMES[weekday_num],
            'user_count': counts_by_weekday.get(weekday_num, 0)
        })

    days_to_subtract = now.weekday() + 1 if now.weekday() != 6 else 0
    start_of_week = now - timezone.timedelta(days=days_to_subtract)
    qs = User.objects.filter(date_joined__gte=start_of_week)

    users_this_week = list(qs.values('id', 'username', 'date_joined'))
    for user in users_this_week:
        user['id'] = str(user['id'])

    return {
        'total_users': User.objects.count(),
        'users_this_week_count': qs.count(),
        'users_this_week': users_this_week,
        'user_count_each_weekday': final_weekday_stats
    }


def get_top_subscription_plans():
    most_popular_subscription_plans = SubscriptionPlans.objects.annotate(
        user_count=Count('user_subscription')
    ).order_by('-user_count')

    top_subscriptions = []
    total_subscribers = 0

    for plan in most_popular_subscription_plans:
        top_subscriptions.append({
            'id': str(plan.id),
            'name': plan.name,
            'subscribers': plan.user_count
        })
        total_subscribers += plan.user_count

    return {
        'top_subscriptions': top_subscriptions,
        'top_3_subscription_plans': top_subscriptions[:3],
        'total_subscribers': total_subscribers
    }




def get_mrr_stats():
    now = timezone.now()

    mrr = UserSubscription.objects.aggregate(
        total_mrr=Sum('plan__price'))['total_mrr'] or 0

    six_months_ago = now - relativedelta(months=5)  

    mrr_by_month_qs = UserSubscription.objects.filter(
        created_at__gte=six_months_ago
    ).annotate(
        month=TruncMonth('created_at')
    ).values('month').annotate(
        mrr=Sum('plan__price')
    ).order_by('month')

    
    mrr_lookup = {entry['month'].strftime('%b %Y'): entry['mrr'] for entry in mrr_by_month_qs}


    mrr_by_month = []
    for i in range(6):
        month_date = (six_months_ago + relativedelta(months=i))
        month_label = month_date.strftime('%b %Y')
        mrr_by_month.append({
            'month': month_label,
            'mrr': mrr_lookup.get(month_label, 0)
        })

    return {
        'current_mrr': mrr,
        'mrr_by_month': mrr_by_month
    }



def get_important_notifications():
    notifications = list(Notifications.objects.order_by('-send_at').values(
        'id', 'title', 'user__username', 'type', 'message'
    )[:3])

    for n in notifications:
        n['id'] = str(n['id'])

    return notifications


def get_important_logs():
    logs = list(AuditLogs.objects.order_by('-created_at').values(
        'id', 'action', 'details', 'user__username', 'created_at'
    )[:3])

    for log in logs:
        log['id'] = str(log['id'])

    return logs


def get_dashboard_stats():
    return {
        'users': get_user_stats(),
        'subscriptions': get_top_subscription_plans(),
        'mrr': get_mrr_stats(),
        'notifications': get_important_notifications(),
        'audit_logs': get_important_logs(),
    }
