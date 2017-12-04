import json

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from main.forms.Login import Login
from main.forms.Signup import Signup
from main.util.Response.Response import Response


def auth_view(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/')

	return render(request, 'auth.html', {
		'title': 'Authentication'
	})


@login_required(login_url='/auth/')
def index_view(request):
	return render(request, 'index.html', {
		'title': 'Collumoto'
	})


@login_required(login_url='/auth/')
def photo_view(request, photo_id):
	return render(request, 'photo.html', {
		'title': ''
	})


def log_out(request):
	logout(request)
	return HttpResponseRedirect(reverse('auth'))


def sign_up(request):
	try:
		if request.method != "POST":
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
		if request.method != "POST":
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