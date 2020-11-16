from django.db import models
from personnel.models import Personnel

# Create your models here.
class AccountManager(models.Model):
    class Meta:
        db_table = "account_managers"

    pid = models.OneToOneField(Personnel, primary_key=True ,on_delete=models.CASCADE, related_name="account_managers")
    manager_title = models.CharField(max_length=20)
    office_location = models.CharField(max_length=100)

    def __str__(self):
        return self.manager_title