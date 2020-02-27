from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from StudentExamReport.forms import LoginForm
# Create your views here.


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

