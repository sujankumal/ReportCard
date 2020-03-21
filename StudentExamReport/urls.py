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
    path('is_admin/',views.is_admin),
    path('view-grades/', views.view_grades),
    path('get-all-students/', views.view_all_students),
    path('teachers-view-grade/', views.teachers_view_grade),
    path('teachers-view-subjects-grade/<int:grade>/', views.teachers_view_subject_by_grade),
    path('teachers-view-students-by-subject/<int:subject>/', views.teachers_view_student_by_subject),
    path('teachers-view-students-by-grade/<int:grade>/', views.teachers_view_students_by_grade),
    path('teachers-view-exams/', views.teachers_view_exam),
    path('get-exam-result-by-grade/<int:exam>/<int:grade>/', views.get_exam_result),
    path('get-subjects-grade/<int:grade>/', views.get_subjects_by_grade),
    path('get-student-result/<int:student>/<int:exam>/', views.get_student_result),
    path('teachers-view-students_marks/',views.teacher_view_students_marks),
    path('teachers-update-student-mark/',views.teachers_update_student_mark),
    path('teachers-update-student-cas/',views.teachers_update_student_cas),
    path('teachers-update-student-comment/',views.teachers_update_student_comment),
    path('get-exam-comment/<int:exam>/', views.find_exam_comment),
    path('update-result-comment/', views.update_result_comment),
    path('get_all_teacher_grades_students_subjects_studentsubject/', views.get_all_teacher_grades_students_subjects_studentsubject),
    path('updateStudentName/',views.updateStudentName),
    path('updateStudentPhone/',views.updateStudentPhone),
    path('updateStudentAddress/',views.updateStudentAddress),
    path('updateStudentDOB/',views.updateStudentDOB),
    path('updateStudentGrade/',views.updateStudentGrade),
    path('updateSubjectTeacher/',views.updateSubjectTeacher),
]
