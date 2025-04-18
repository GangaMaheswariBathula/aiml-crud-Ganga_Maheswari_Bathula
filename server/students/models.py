from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    passin_year = models.IntegerField()
    passout_year = models.IntegerField()

    def __str__(self):
        return self.name

