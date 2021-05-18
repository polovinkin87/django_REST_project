from django.contrib import admin
from .models import Project, ToDo

# Register your models here.
admin.site.register(Project)
admin.site.register(ToDo)
