from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
import logging
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .filters import TodoFilter

logger = logging.getLogger(__name__)


class ProjectPagination(PageNumberPagination):
    page_size = 10


class ToDoPagination(PageNumberPagination):
    page_size = 20


class ProjectModelViewSet(ModelViewSet):
    logger.warning("hello project!")
    queryset = Project.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination

    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset


class ToDoModelViewSet(ModelViewSet):
    logger.warning("hello todo!")
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = TodoFilter

    def destroy(self, request, pk=None):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
