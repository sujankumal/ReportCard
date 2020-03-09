from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, permissions
from rest_framework.decorators import api_view 
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from StudentExamReport.forms import LoginForm
from .serializers import UserSerializer, UserSerializerWithToken, GradeSerializer,StudentSerializer, SubjectSerializer
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

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        user = request.data.get('user')
        if not user:
            return Response({'response' : 'error', 'message' : 'No data found'})
        
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"response" : "error", "message" : serializer.errors})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
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
    grades = Grade.objects.all()
    serialized_grades = GradeSerializer(grades, many=True)
    return Response(serialized_grades.data)

@api_view(['GET'])
def teachers_view_subject(request):
    subjects = Subject.objects.filter(teacher = User.objects.get(username = request.user))
    serialized_subjects = SubjectSerializer(subjects, many=True)
    return Response(serialized_subjects.data)