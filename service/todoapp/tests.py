import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo
from users.models import User
from django.contrib.auth import get_user_model


class TestProjectViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/todos/',
                               {"project": 1, "text": "some text", "creator": 10, "is_active": False},
                               format='json')
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        project = Project.objects.create(name='Test',
                                         users=4,
                                         text='some text')
        request = factory.post('/api/todos/',
                               {"project": 1, "text": "test",
                                "creator": 1, "is_active": True},
                               format='json')
        admin = User.objects.create_superuser('admin', 'testadmin@admin.com', 'admin123456')
        print(admin.is_superuser)
        print(admin.is_staff)
        force_authenticate(request, admin)
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # APIClient
    def test_get_detail(self):
        project = Project.objects.create(name='Test', users=4, text='some text')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        print(response.status_code)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(name='Test', users=4, text='some text')
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {"name": "Test2"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = Project.objects.create(name='Test2', users=5, text='some text')
        client = APIClient()
        admin = User.objects.create_superuser('admin5', 'admin5@admin.com', 'admin1234567')
        todo = ToDo.objects.create(project=project, text='some link1', creator=admin)
        client.login(username='admin5', password='admin1234567')
        response = client.put(f'/api/todos/{todo.pk}/', {"project": 1, "text": "some new link", "creator": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.project, project)
        self.assertEqual(todo.text, 'some new link')
        client.logout()


# APITestCase
class TestBookViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = mixer.blend(Project)
        todo = mixer.blend(ToDo)
        admin = User.objects.create_superuser('admin6', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin6', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.pk}/',
                                   {'text': 'new text', 'project': project.pk, "creator": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'new text')

    def test_edit_mixer(self):
        project = mixer.blend(Project)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        todo = ToDo.objects.create(project=project, text='some link1', creator=admin)
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.pk}/',
                                   {'text': 'new text', 'project': project.pk, "creator": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'new text')
