from django.contrib import admin
from .models import Grade
from .models import Student
from .models import Subject
from .models import StudentSubject
from .models import Exam
from .models import Result
from .models import ResultComment

# Register your models here.

admin.site.register([
        Grade, 
        Student,  
        Subject,
        StudentSubject,
        Exam, 
        Result, 
        ResultComment])