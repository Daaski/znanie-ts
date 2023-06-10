from django.urls import path

from addresses.views import AddressEventListView
from events.views import EventDetailView, EventListView, EventCreateView, EventUpdateView, EventDeleteView

urlpatterns = [
    path('<int:pk>/', EventDetailView.as_view()),
    path('', EventListView.as_view()),
    path('create/', EventCreateView.as_view()),
    path('address/', AddressEventListView.as_view()),
    path('<int:pk>/update/', EventUpdateView.as_view()),
    path('<int:pk>/delete/', EventDeleteView.as_view())
]
