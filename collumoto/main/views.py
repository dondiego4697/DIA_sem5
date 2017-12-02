from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def auth_view(request):
	return render(request, 'auth.html', {
		'title': 'Authentication'
	})


@login_required(login_url='/auth/')
def index(request):
	return render(request, 'index.html', {
		'title': 'Collumoto'
	})


@login_required(login_url='/auth/')
def photo(request, photo_id):
	return render(request, 'photo.html', {
		'title': ''
	})
