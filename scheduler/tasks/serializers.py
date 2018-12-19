from rest_framework import serializers
from tasks.models import Jobs


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Jobs
        fields = ("job_id","jobname","jobtype","priority","disabled","created_date")