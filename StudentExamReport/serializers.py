from rest_framework import serializers
# from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Exam, Grade, Subject, Student, StudentSubject, Result, ResultComment

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username','id')


        
class GradeSerializer(serializers.ModelSerializer):
   
   class Meta:
        model = Grade
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
   
   class Meta:
        model = Student
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exam
        fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = Result
        fields = '__all__'

class ResultCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResultComment
        fields = '__all__'

        
class StudentSubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentSubject
        fields = '__all__'