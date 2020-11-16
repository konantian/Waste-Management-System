from django.db import models
from personnel.models import Personnel
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    class Meta:
        db_table = "users"

    user_id = models.OneToOneField(Personnel, primary_key=True, on_delete=models.CASCADE, related_name="users")
    role = models.CharField(max_length = 20)
    login = models.CharField(max_length=10,unique=True)
    password = models.CharField(max_length = 50)

    USERNAME_FIELD = "login"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.login