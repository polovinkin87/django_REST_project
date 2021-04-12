from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserModelSerializerVersion(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("user_name", "email")
