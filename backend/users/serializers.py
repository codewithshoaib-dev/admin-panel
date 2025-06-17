from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model


User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            
        ]

    def validate_email(self, value):
        if value is None:
            raise serializers.ValidationError('Email required.')
        existing_email = User.objects.filter(email=value).first()
        if existing_email:
            raise serializers.ValidationError('Cannot use that email')
        return value
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data['email']
        password = data['password']

        if email is None or password is None:
            raise serializers.ValidationError('Both Fields are required')
       
        
        user = authenticate(email=email, password=password)

        if user:
            data['user'] = user
            return data
        
        raise serializers.ValidationError('Invalid Credentials')
    

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'role',
            'is_superuser',
        ]

class UserManagingSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'role',
            'password',
        ]

    def validate_email(self, value):
        if value is None:
            raise serializers.ValidationError('Email required.')
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Cannot use that email.')
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
