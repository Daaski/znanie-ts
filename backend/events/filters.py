from datetime import timedelta
import django_filters
from django_filters import filters
from events.models import Event


class EventFilter(django_filters.FilterSet):
    start = filters.DateFilter(field_name='start', method='filter_start')
    end = filters.DateFilter(field_name='end', method='filter_end')
    address = filters.CharFilter(field_name='address__subject', lookup_expr='exact')

    def filter_start(self, queryset, name, value):
        end_param = self.data.get('end')

        lookup_kwargs = {
            f'{name}__gte' if end_param else f'{name}__date': value,
        }

        return queryset.filter(**lookup_kwargs)

    def filter_end(self, queryset, name, value):
        lookup_kwargs = {
            f'{name}__lte': value + timedelta(days=1),
        }

        return queryset.filter(**lookup_kwargs)

    class Meta:
        model = Event
        fields = ('start', 'end', 'address')
