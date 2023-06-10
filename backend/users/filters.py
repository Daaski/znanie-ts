import django_filters
from django.db.models import Q
from django_filters import filters
from users.models import University, User


class UniversityFilter(django_filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = University
        fields = ('name',)


class AuthorFilter(django_filters.FilterSet):
    fullname = django_filters.CharFilter(method='filter_search_query')
    surname = django_filters.CharFilter(field_name='surname', lookup_expr='istartswith')

    class Meta:
        model = User
        fields = ('surname',)

    def filter_search_query(self, queryset, name, value):
        values = value.split()

        if len(values) > 2:
            raise Exception

        if len(values) == 1:
            values.append('')

        return queryset.filter(
            Q(name__istartswith=values[0], surname__istartswith=values[1]) | Q(name__istartswith=values[1],
                                                                               surname__istartswith=values[0])
        )
