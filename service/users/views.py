from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer
import logging

logger = logging.getLogger(__name__)


class UserModelViewSet(ModelViewSet):
    logger.warning("hello user!")
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
