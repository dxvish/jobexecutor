from django.conf.urls import include, url
from django.contrib import admin
from tasks import views

urlpatterns = [
    url(r'^save_job/$',views.save_job,name='save_job'),
    url(r'^list_all/$',views.list_all,name='list_all'),
    url(r'^delete_job/(?P<job_id>[0-9\-a-z]+)$',views.delete_job,name='delete_job'),
    url(r'^disable_job/(?P<job_id>[0-9\-a-z]+)$',views.disable_job,name='disable_job'),
    url(r'^$',views.home,name='home')
]
