from django.db import models

# Create your models here.
class Truck(models.Model):
    class Meta:
        db_table = "trucks"

    truck_id = models.CharField(primary_key=True,max_length=20)
    model = models.CharField(max_length = 50)
    truck_type = models.CharField(max_length = 50 )

    def __str__(self):
        return self.model
