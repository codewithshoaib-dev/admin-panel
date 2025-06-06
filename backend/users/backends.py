from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        print(email, password, '2')

        if email is None or password is None:
            return None
        print('1')
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return None
        print('2')

        if user.check_password(password):
            return user
        print('not 3')
        return None
