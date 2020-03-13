from django.urls import path
from . import views
# from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework_simplejwt.views import  TokenObtainPairView, TokenRefreshView, TokenVerifyView
app_name = 'StudentExamReport'

urlpatterns = [
    path('', views.index, name='index'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('user-login/', views.user_login, name="user_login"),
    path('user-register/', views.user_register, name="user_register"),
    path('user-logout/', views.user_logout, name="user_logout"),
    path('user_verify/', views.verify_user, name="verify_user"),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('teachers-view-grade/', views.teachers_view_grade),
    path('teachers-view-subjects-grade/<int:grade>/', views.teachers_view_subject_by_grade),
    path('teachers-view-students-by-subject/<int:subject>/', views.teachers_view_student_by_subject),
    path('teachers-view-students-by-grade/<int:grade>/', views.teachers_view_students_by_grade),
    path('teachers-view-exams/', views.teachers_view_exam),
    path('teachers-process-results/<int:exam>/<int:student>/', views.teachers_process_results),
    # path('update-marks/', views.teachers_update_marks),
    path('teachers-view-students_marks/',views.teacher_view_students_marks),
    path('teachers-update-student-mark/',views.teachers_update_student_mark),
    path('teachers-update-student-cas/',views.teachers_update_student_cas),
    path('teachers-update-student-comment/',views.teachers_update_student_comment),
    
]
