from django.shortcuts import render
from rest_framework import mixins, viewsets
from .models import User
from .serializers import UserModelSerializer
import logging

logger = logging.getLogger(__name__)


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    logger.warning("hello user!")
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
