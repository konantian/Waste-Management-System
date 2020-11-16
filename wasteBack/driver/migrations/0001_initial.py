# Generated by Django 3.1.3 on 2020-11-16 13:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('truck', '0001_initial'),
        ('personnel', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('pid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='drivers', serialize=False, to='personnel.personnel')),
                ('certification', models.CharField(max_length=30)),
                ('owned_truck_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='drivers_truck', to='truck.truck')),
            ],
            options={
                'db_table': 'drivers',
                'unique_together': {('pid', 'owned_truck_id')},
            },
        ),
    ]
