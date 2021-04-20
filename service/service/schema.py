import graphene
from graphene_django import DjangoObjectType
from users.models import User
from todoapp.models import Project, ToDo


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todos_by_project_name = graphene.List(ToDoType, name=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todos_by_project_name(self, info, name=None):
        todos = ToDo.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


schema = graphene.Schema(query=Query)
