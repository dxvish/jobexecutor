from django.shortcuts import render
from tasks.consts import *
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from tasks.models import *
import os,sys
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import time
import datetime
from tasks.serializers import JobSerializer

def home(request):
    return render(request,'index.html',{"EVENT_TYPES":json.dumps(EVENT_TYPES),"PRIORITY":json.dumps(PRIORITY)})

@csrf_exempt
@api_view(['POST']) 
def save_job(request):
    try:
        currentState = request.data
        job = Jobs()
        job.jobname =  currentState["job_name"]
        job.jobtype = currentState["jobtype"]
        job.priority = currentState["priority"]
        job.repeat = currentState["is_recurrance"]
        job.disabled = 0 #currentState["disabled"]
        job.save()
        return HttpResponse("Success")
    except Exception as error_msg:    
        print("error",error_msg)
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        return HttpResponse(error_msg,status=500)

@api_view(['GET'])   
def delete_job(request,event_id):
    try:
        if request.method == "GET":
            Event.objects.get(pk=event_id).delete()
            events = Event.objects.all().filter()
            jsonResponse = EventsSerializer(events,many=True)
            return Response(jsonResponse.data)
        else:
            return Response("Invalid Request")
    except Exception as error_msg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        
        
@api_view(['GET'])   
def disable_job(request,event_id):
    try:
        if request.method == "GET":
            Event.objects.filter(pk=event_id).update(disabled=1)
            events = Event.objects.filter()
            jsonResponse = EventsSerializer(events,many=True)
            return Response(jsonResponse.data)
        else:
            return Response("Invalid Request")
    except Exception as error_msg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        

@api_view(['GET'])   
def list_all(request):
    try:
        if request.method == "GET":
            jobs = Jobs.objects.all()
            jsonResponse = JobSerializer(jobs,many=True)
            print(json.dumps(jsonResponse.data))
            return Response(json.dumps(jsonResponse.data))
        else:
            return Response("Invalid Request")
    except Exception as error_msg:
        print(error_msg)
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
