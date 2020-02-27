from django import forms
from StudentExamReport import *
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    username = forms.CharField(max_length=554)
    password = forms.CharField(widget=forms.PasswordInput)