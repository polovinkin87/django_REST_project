from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
import logging

logger = logging.getLogger(__name__)


class ProjectModelViewSet(ModelViewSet):
    logger.warning("hello project!")
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
    logger.warning("hello todo!")
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
