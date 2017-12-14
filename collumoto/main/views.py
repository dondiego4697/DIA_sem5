import json

import os
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from main.forms.Like import LikeForm
from main.forms.Login import Login
from main.forms.Signup import Signup
from main.forms.AddPhoto import AddPhoto
from main.forms.GetPhotos import GetPhotos
from main.models import Photo, Profile
from main.util.Response.Response import Response


def get_env():
	return os.environ.get('NODE_ENV')


def auth_view(request):
	if request.user.is_authenticated:
		return HttpResponseRedirect('/')
	return render(request, 'auth.html', {
		'title': 'Authentication',
		'node_env': os.environ.get('NODE_ENV')
	})


@login_required(login_url='/auth/')
def index_view(request):
	return render(request, 'index.html', {
		'title': 'Collumoto',
		'node_env': os.environ.get('NODE_ENV')
	})


@login_required(login_url='/auth/')
def photo_view(request, photo_id):
	photo = Photo.objects.get_by_id(photo_id)
	user = request.user
	profile = Profile.objects.get(user=user)
	date = photo.pub_date

	img = str(photo.img).split('/')
	img = img[1:len(img)]
	img = ['res'] + img
	img = '/' + '/'.join(img)

	is_liked = Photo.objects.is_liked(profile, photo)
	return render(request, 'photo.html', {
		'id': photo_id,
		'title': photo.name,
		'description': photo.description,
		'img': img,
		'date': "{}:{} {}.{}.{}".format(date.hour, date.minute, date.day, date.month, date.year),
		'is_liked': False if is_liked is None or not is_liked else True,
		'likes_count': photo.likes.all().filter(like=True).count(),
		'node_env': os.environ.get('NODE_ENV')
	})


def log_out(request):
	logout(request)
	return HttpResponseRedirect(reverse('auth'))


def sign_up(request):
	try:
		if request.method != 'POST':
			return Response.send400('Only POST!')

		body = json.loads(request.body)
		sign_up_form = Signup(body)
		if not sign_up_form.validate():
			return Response.send400()

		if not sign_up_form.reg():
			return Response.send400()

		return Response.send200()
	except Exception:
		return Response.send400()


def log_in(request):
	try:
		if request.method != 'POST':
			return Response.send400('Only POST!')

		body = json.loads(request.body)
		log_in_form = Login(body)
		if not log_in_form.validate():
			return Response.send400()

		user = log_in_form.auth()
		if user is not None:
			login(request, user)
			return HttpResponseRedirect('/')

		return Response.send400()
	except Exception:
		return Response.send400()


def get_photos(request):
	try:
		if request.method != 'GET':
			return Response.send400('Only GET!')

		limit = request.GET['limit']
		offset = request.GET['offset']

		get_photos_form = GetPhotos(limit, offset, request.user)
		if not get_photos_form.validate():
			return Response.send400()

		return Response.send200(get_photos_form.get_json())
	except Exception:
		return Response.send400()


def add_photo(request):
	try:
		if request.method != 'POST':
			return Response.send400('Only POST!')

		body = json.loads(request.body)
		add_photo_form = AddPhoto(body, request.user)
		if not add_photo_form.validate():
			return Response.send400()

		if not add_photo_form.add():
			return Response.send400()

		return Response.send200()
	except Exception:
		return Response.send400()


def like(request):
	try:
		if request.method != 'GET':
			return Response.send400('Only GET!')

		like_status = request.GET['like']
		photo_id = request.GET['photo_id']

		like_form = LikeForm(request.user, like_status, photo_id)
		if not like_form.validate():
			return Response.send400()
		like_result = like_form.create_like()
		return Response.send200({'result': like_result})
	except Exception as e:
		print(e)
		return Response.send400()
