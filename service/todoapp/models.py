from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    users = models.ManyToManyField(User)
    text = models.TextField(max_length=128, blank=True)

    def __str__(self):
        return f"Проект: {self.name}, с пользователями: ({self.users})"


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(max_length=128, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"TODO: {self.project} от {self.create_at})"
