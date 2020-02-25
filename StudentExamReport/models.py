from django.db import models
# Create your models here.

class UserProfile():
    pass

    
class Grades(models.Model):
    name = models.CharField("Class Name", max_length=50)
    number_of_students = models.IntegerField()

class Students(models.Model):
    student_name = models.CharField("Student Name",max_length=100)
    date_of_birth = models.DateField("Date Of Birth")
    address = models.CharField(max_length=100)
    phone = models.IntegerField("Phone Number")
    student_grade = models.ForeignKey("Grades", on_delete=models.PROTECT, verbose_name="Student's Class")
    

class Subjects(models.Model):
    name = models.CharField("Subject Name", max_length=50)
    code = models.CharField("Subject Code", max_length=10, unique=True)
    grade = models.ForeignKey("Grades",on_delete=models.CASCADE, verbose_name="Subjects Grade")
    marks = models.IntegerField("Subjects Mark")
    

class StudentsSubjects(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE, verbose_name="Student's Name")
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE,verbose_name="Student's Subject")
    optional = models.BooleanField()


class Exams(models.Model):
    exam_term_in_choice = [
        ('1st', 'First'),
        ('2nd','Second'),
        ('3rd','Third')
    ]
    exam_term =  models.CharField(choices=exam_term_in_choice, max_length=3,verbose_name="Exam Term")
    date = models.DateField()
    name = models.CharField(max_length=50)

class Results():
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exams, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE)
    mark = models.IntegerField()
    teachers_comment = models.CharField("Teacher's Comment", max_length=300)

class ResultsComment():
    exam = models.ForeignKey(Exams, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    result_comment = models.CharField(max_length=300)
