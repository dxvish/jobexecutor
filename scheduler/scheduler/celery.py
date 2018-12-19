from __future__ import absolute_import
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scheduler.settings')
import json

from celery import Celery
from django.conf import settings
import logging
import os,sys
import re

import datetime

app = Celery('scheduler')
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

@app.task        
def sum():
    try:
        print(5+10)
    except Exception as error_msg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
