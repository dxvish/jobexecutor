from __future__ import unicode_literals
from django.db import models
from django.db.models.fields.related import ForeignKey
import uuid

class Jobs(models.Model):
    job_id = models.UUIDField(primary_key = True,default=uuid.uuid4)
    jobname = models.CharField(max_length=160,blank=False)
    jobtype = models.CharField(max_length=160,blank=False,default=1)
    priority = models.IntegerField(default=5)
    repeat = models.BooleanField(default=False)
    disabled = models.IntegerField(default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        managed=True
        db_table='job'
        ordering =['-created_date']
        unique_together = ("jobname","jobtype")