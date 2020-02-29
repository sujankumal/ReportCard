from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token

app_name = 'StudentExamReport'

urlpatterns = [
    path('', views.index, name='index'),
    path('user-login/', views.user_login, name="user_login"),
    path('user-register/', views.user_register, name="user_register"),
    path('user-logout/', views.user_logout, name="user_logout"),
    path('user_verify/', views.verify_user, name="verify_user"),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
]
