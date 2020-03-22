from django.contrib import admin
from .models import Grade
from .models import Student
from .models import Subject
from .models import StudentSubject
from .models import Exam
from .models import Result
from .models import ResultComment

# Register your models here.

# admin.site.register([
#         Grade, 
#         Student,  
#         Subject,
#         StudentSubject,
#         Exam, 
#         Result, 
#         ResultComment])

class GradeAdmin(admin.ModelAdmin):
    list_display = ('name', 'classteacher', 'number_of_students')


class ExamAdmin(admin.ModelAdmin):
    list_display = ('name', 'exam_term', 'date')


class ResultCommentAdmin(admin.ModelAdmin):
    list_display = ('student', 'exam', 'result_comment')
    search_fields = ['student__student_name']


class ResultAdmin(admin.ModelAdmin):
    list_display = ('exam','subject','student','mark','cas','teachers_comment')
    search_fields = ['student__student_name']


class StudentSubjectAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'optional')
    search_fields = ['student__student_name', 'subject__code', 'subject__name']


class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'student_grade','phone','address','date_of_birth')
    search_fields = ['student_name','phone']


class SubjectAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'grade', 'teacher', 'marks')
    search_fields = ['name','code', 'grade__name', 'teacher__username']


admin.site.register(Grade, GradeAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(StudentSubject, StudentSubjectAdmin)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Result, ResultAdmin)
admin.site.register(ResultComment, ResultCommentAdmin)