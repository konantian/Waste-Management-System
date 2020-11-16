from django.db import models

# Create your models here.
class Personnel(models.Model):
    class Meta:
        db_table = "personnel"

    pid = models.CharField(max_length=10,primary_key=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, editable=False)
    address = models.CharField(max_length=100)
    supervisor_pid = models.CharField(max_length=10,null=True)

    def __str__(self):
        return self.name