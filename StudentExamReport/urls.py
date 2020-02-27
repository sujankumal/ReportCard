from django.urls import path
from . import views

app_name = 'StudentExamReport'

urlpatterns = [
    path('', views.index, name='index'),
    path('user-login/', views.user_login, name="user_login"),
    path('user-register/', views.user_register, name="user_register"),
    path('user-logout/', views.user_logout, name="user_logout"),
    path('user_verify/', views.verify_user, name="verify_user")
]
