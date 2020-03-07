from django.urls import path
from . import views
# from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework_simplejwt.views import  TokenObtainPairView, TokenRefreshView, TokenVerifyView
app_name = 'StudentExamReport'

urlpatterns = [
    path('', views.index, name='index'),
    path('user-login/', views.user_login, name="user_login"),
    path('user-register/', views.user_register, name="user_register"),
    path('user-logout/', views.user_logout, name="user_logout"),
    path('user_verify/', views.verify_user, name="verify_user"),
    # path('token-auth/', obtain_jwt_token),
    # path('refresh-auth',refresh_jwt_token),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('teachers-view-grade/', views.teachers_view_grade),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
