# Generated by Django 3.0.4 on 2020-03-12 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StudentExamReport', '0002_result_cas'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='cas',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='result',
            name='mark',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]