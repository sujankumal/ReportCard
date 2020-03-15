from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
# from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, permissions, serializers
from rest_framework.decorators import api_view 
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from StudentExamReport.forms import LoginForm
from .serializers import UserSerializer, GradeSerializer,StudentSerializer, SubjectSerializer, ExamSerializer, ResultSerializer, ResultCommentSerializer
from .models import Exam, Grade, Subject, Student, StudentSubject, Result, ResultComment

# Create your views here.

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    # permission_classes = (permissions.AllowAny,)

    # def post(self, request, format=None):
    #     user = request.data.get('user')
    #     if not user:
    #         return Response({'response' : 'error', 'message' : 'No data found'})
        
        # serializer = UserSerializerWithToken(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response({"response" : "error", "message" : serializer.errors})
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
@login_required(login_url='StudentExamReport:user_login')
def index(request):
    return render(request,'StudentExamReport/index.html')


def user_login(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            if request.user.is_active:
                return redirect('StudentExamReport:index')
            else:
                messages.warning(request, "Inactive User")
                logout(request)
                return redirect('StudentExamReport:user_login')
        else:
            login = LoginForm()
            return render(request, 'StudentExamReport/login.html', context={"login_form": login})


def user_logout(request):
    logout(request)
    messages.success(request, "User Logged-out !!!")
    return redirect('StudentExamReport:user_login')


def user_register(request):
    return HttpResponse("register")


def verify_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                messages.success(request, 'Login Successful')

                return redirect('StudentExamReport:index')
            else:
                messages.warning(request, "Inactive User")
                return redirect('StudentExamReport:user_login')
        else:
            messages.warning(request, "User not found! error")
            return redirect('StudentExamReport:user_login')


@api_view(['GET'])
def teachers_view_grade(request):
    grades = list(set(qs["grade"] for qs in Subject.objects.filter(teacher = User.objects.get(username = request.user)).values('grade')))
    gradedata = Grade.objects.filter(pk__in=grades).order_by('name')
    serialized_grades = GradeSerializer(gradedata, many=True)
    return Response(serialized_grades.data)


@api_view(['GET'])
def view_grades(request):
    gradedata = Grade.objects.all().order_by('name')
    serialized_grades = GradeSerializer(gradedata, many=True)
    return Response(serialized_grades.data)

@api_view(['GET'])
def teachers_view_subject_by_grade(request, grade):
    subjects = Subject.objects.filter(teacher = User.objects.get(username = request.user), grade = grade)
    serialized_subjects = SubjectSerializer(subjects, many=True)
    return Response(serialized_subjects.data)


@api_view(['GET'])
def get_subjects_by_grade(request, grade):
    subjects = Subject.objects.filter(grade = grade)
    serialized_subjects = SubjectSerializer(subjects, many=True)
    return Response(serialized_subjects.data)


@api_view(['GET'])
def teachers_view_student_by_subject(request, subject):
    students = list(set(querystudent["student"] for querystudent in StudentSubject.objects.filter(subject = subject).values('student')))
    studentdata = Student.objects.filter(pk__in=students)
    serialized_students = StudentSerializer(studentdata, many=True)
    return Response(serialized_students.data)

@api_view(['GET'])
def teachers_view_students_by_grade(request, grade):
    studentdata = Student.objects.filter(student_grade=grade)
    serialized_students = StudentSerializer(studentdata, many=True)
    return Response(serialized_students.data)


@api_view(['GET'])
def teachers_view_exam(request):
    exams = Exam.objects.all().order_by('-pk')
    serialized_exams = ExamSerializer(exams, many=True)
    return Response(serialized_exams.data)

@api_view(['GET'])
def view_all_students(request):
    students = Student.objects.all().order_by('student_name')
    serialized_students = StudentSerializer(students, many=True)
    return Response(serialized_students.data)

@api_view(['GET'])
def get_exam_result(request, exam, grade):
    results = Result.objects.filter(exam=exam,student__student_grade=grade)
    serialized_result = ResultSerializer(results, many=True)
    return Response(serialized_result.data)

@api_view(['GET'])
def get_student_result(request, student, exam):
    result = Result.objects.filter(exam=exam, student=student)
    serialized_result = ResultSerializer(result, many=True)
    return Response(serialized_result.data)

@api_view(['POST'])
def teachers_update_student_mark(request):
    print(request.data)
    result, created = Result.objects.update_or_create(
        student = Student.objects.get(pk=request.data.get('student')), 
        exam = Exam.objects.get(pk=request.data.get('exam')),
        subject = Subject.objects.get(pk=request.data.get('subject')),
        defaults={'mark': request.data.get('marks'),'cas': request.data.get('cas'), 'teachers_comment': request.data.get('comment')},
        # defaults={'mark': request.data.get('marks')},
        )
    return Response('')

@api_view(['POST'])
def teachers_update_student_cas(request):
    result, created = Result.objects.update_or_create(
        student = Student.objects.get(pk=request.data.get('student')), 
        exam = Exam.objects.get(pk=request.data.get('exam')),
        subject = Subject.objects.get(pk=request.data.get('subject')),
        defaults={'mark': request.data.get('marks'),'cas': request.data.get('cas'), 'teachers_comment': request.data.get('comment')},
        # defaults={'mark': request.data.get('marks')},
        )
    return Response('')

@api_view(['POST'])
def teachers_update_student_comment(request):
    print(request.data)
    result, created = Result.objects.update_or_create(
        student = Student.objects.get(pk=request.data.get('student')), 
        exam = Exam.objects.get(pk=request.data.get('exam')),
        subject = Subject.objects.get(pk=request.data.get('subject')),
        defaults={'mark': request.data.get('marks'),'cas': request.data.get('cas'), 'teachers_comment': request.data.get('comment')},
        # defaults={'teachers_comment': request.data.get('comment')},
        )
    
    return Response('')

@api_view(['POST'])
def teacher_view_students_marks(request):
    students =list(qstu['id'] for qstu in Student.objects.filter(student_grade= request.data.get('grade')).values('id'))
    # results = Result.objects.filter(student__in = students, exam = Exam.objects.get(pk = request.data.get('exam')), subject = Subject.objects.get(pk = request.data.get('subject')))
    results = Result.objects.filter(student__in = students, exam = request.data.get('exam'), subject = request.data.get('subject'))
    serialized_results = ResultSerializer(results, many=True)
    return Response(serialized_results.data)


@api_view(['GET'])
def find_exam_comment(request, exam):
    comments = ResultComment.objects.filter(exam=exam)
    serialized_comment = ResultCommentSerializer(comments, many=True)
    return Response(serialized_comment.data)

@api_view(['POST'])
def update_result_comment(request):
    result, created = ResultComment.objects.update_or_create(
        student = Student.objects.get(pk=request.data.get('student')), 
        exam = Exam.objects.get(pk=request.data.get('exam')),
        defaults={'result_comment': request.data.get('comment')},
        )
    comments = ResultComment.objects.filter(exam=request.data.get('exam'))
    serialized_comment = ResultCommentSerializer(comments, many=True)
    return Response(serialized_comment.data)
