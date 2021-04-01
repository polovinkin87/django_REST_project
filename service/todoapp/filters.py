from django_filters import rest_framework
from .models import ToDo


class TodoFilter(rest_framework.FilterSet):
    create_at = rest_framework.DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'create_at']
