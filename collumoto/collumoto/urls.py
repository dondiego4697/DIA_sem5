"""collumoto URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from main import views

urlpatterns = [
	url(r'^admin/?', admin.site.urls),
	url(r'^auth/?', views.auth_view, name='auth'),
	url(r'^question/(?P<photo_id>[0-9]+)/?', views.photo_view, name='photo'),
	url(r'^signup/?', views.sign_up, name='signup'),
	url(r'^login/?', views.log_in, name='login'),
	url(r'^logout/?', views.log_out, name='logout'),
	url(r'^get-photos/?', views.get_photos, name='get_photos'),
	url(r'^add-photo/?', views.add_photo, name='add_photo'),
	url(r'^like/?', views.like, name='like'),
	url(r'^/?', views.index_view, name='index'),
]
