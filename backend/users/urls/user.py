from addresses.views import AddressListView
from users.routers import CustomRouter
from users.views import UniversityListView, CustomUserViewSet, LectorListView, LectorDetailView
from django.urls import path

users_router = CustomRouter()

users_router.register('', CustomUserViewSet, basename='users')

urlpatterns = [
    path('univer/', UniversityListView.as_view()),
    path('address/', AddressListView.as_view()),
    path('lectors/', LectorListView.as_view()),
    path('lectors/<int:pk>/', LectorDetailView.as_view())
]

urlpatterns += users_router.urls
