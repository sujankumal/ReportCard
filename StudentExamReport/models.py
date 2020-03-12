from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile():
    pass

    
class Grade(models.Model):
    name = models.CharField("Class Name", max_length=50)
    number_of_students = models.IntegerField()

    def __str__(self):
        return self.name

class Student(models.Model):
    student_name = models.CharField("Student Name",max_length=100)
    date_of_birth = models.DateField("Date Of Birth")
    address = models.CharField(max_length=100)
    phone = models.IntegerField("Phone Number")
    student_grade = models.ForeignKey("Grade", on_delete=models.PROTECT, verbose_name="Student's Class")

    
    def __str__(self):
        return str(self.pk) +" : "+ self.student_name    

class Subject(models.Model):
    name = models.CharField("Subject Name", max_length=50)
    code = models.CharField("Subject Code", max_length=10, unique=True)
    grade = models.ForeignKey("Grade",on_delete=models.CASCADE, verbose_name="Subjects Grade")
    marks = models.IntegerField("Subjects Mark")
    teacher = models.ForeignKey(User,on_delete=models.CASCADE, verbose_name="Teacher")

    def __str__(self):
        return self.code
    

class StudentSubject(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="Student's Name")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE,verbose_name="Student's Subject")
    optional = models.BooleanField()

    def __str__(self):
        return self.student.__str__() +" "+ self.subject.__str__()


class Exam(models.Model):
    exam_term_in_choice = [
        ('1st', 'First'),
        ('2nd','Second'),
        ('3rd','Third')
    ]
    exam_term =  models.CharField(choices=exam_term_in_choice, max_length=3,verbose_name="Exam Term")
    date = models.DateField()
    name = models.CharField(max_length=50)


    def __str__(self):
        return self.name

class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    mark = models.IntegerField()
    cas = models.IntegerField()
    teachers_comment = models.CharField("Teacher's Comment", max_length=300)

    def __str__(self):
        return self.student.__str__() +" "+ self.exam.__str__()+" "+ self.subject.__str__()

class ResultComment(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    result_comment = models.CharField(max_length=300)
