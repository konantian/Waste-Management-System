from django.db import models
from account_manager.models import AccountManager
# Create your models here.
class Account(models.Model):
    class Meta:
        db_table = "accounts"

    account_no = models.CharField(primary_key = True,max_length = 10)
    account_mgr = models.ForeignKey(AccountManager, on_delete=models.CASCADE, related_name="account")
    customer_name = models.CharField(max_length= 50)
    contact_info = models.CharField(max_length=20)
    customer_type = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    total_amount = models.FloatField()

    def __str__(self):
        return self.customer_name
