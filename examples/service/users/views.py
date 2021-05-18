from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerVersion

# class UserModelViewSet(mixins.ListModelMixin,
#                        mixins.RetrieveModelMixin,
#                        mixins.UpdateModelMixin,
#                        viewsets.GenericViewSet):
class UserModelViewSet(ModelViewSet):
    # queryset = User.objects.all()
    queryset = User.objects.exclude(user_name='admin')
    http_method_names = ["get", "put", "head"]
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == "0.1":
            return UserModelSerializerVersion
        return UserModelSerializer
