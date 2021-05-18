from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("user_name", "email",)
    list_display_links = ("user_name",)
