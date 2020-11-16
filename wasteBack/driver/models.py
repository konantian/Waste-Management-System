from django.db import models
from personnel.models import Personnel
from truck.models import Truck
# Create your models here.

class Driver(models.Model):
    class Meta:
        db_table = "drivers"
        unique_together = ('pid','owned_truck_id')
    
    pid = models.OneToOneField(Personnel, primary_key=True ,on_delete=models.CASCADE, related_name="drivers")
    certification = models.CharField(max_length = 30)
    owned_truck_id = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="drivers_truck", null=True)

    def __str__(self):
        return self.pid

