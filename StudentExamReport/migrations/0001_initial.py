# Generated by Django 3.0.2 on 2020-02-25 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exam_term', models.CharField(choices=[('1st', 'First'), ('2nd', 'Second'), ('3rd', 'Third')], max_length=3, verbose_name='Exam Term')),
                ('date', models.DateField()),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Class Name')),
                ('number_of_students', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_name', models.CharField(max_length=100, verbose_name='Student Name')),
                ('date_of_birth', models.DateField(verbose_name='Date Of Birth')),
                ('address', models.CharField(max_length=100)),
                ('phone', models.IntegerField(verbose_name='Phone Number')),
                ('student_grade', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='StudentExamReport.Grade', verbose_name="Student's Class")),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Subject Name')),
                ('code', models.CharField(max_length=10, unique=True, verbose_name='Subject Code')),
                ('marks', models.IntegerField(verbose_name='Subjects Mark')),
                ('grade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Grade', verbose_name='Subjects Grade')),
            ],
        ),
        migrations.CreateModel(
            name='StudentSubject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('optional', models.BooleanField()),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Student', verbose_name="Student's Name")),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Subject', verbose_name="Student's Subject")),
            ],
        ),
        migrations.CreateModel(
            name='ResultComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result_comment', models.CharField(max_length=300)),
                ('exam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Exam')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Student')),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mark', models.IntegerField()),
                ('teachers_comment', models.CharField(max_length=300, verbose_name="Teacher's Comment")),
                ('exam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Exam')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Student')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='StudentExamReport.Subject')),
            ],
        ),
    ]