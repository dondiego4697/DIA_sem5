import base64
from django.core.files.base import ContentFile
import time

from main.models import Photo, Profile


def get_photo_name():
	return str(round(time.time() * 1000))


class AddPhoto:
	def __init__(self, data, user):
		self.user = user
		self.name = data['name']
		self.description = data['description']
		self.photo = data['photo']

	def validate(self):
		if not self.name or not self.description or not self.photo or not self.user.is_authenticated:
			return False
		return True

	def add(self):
		try:
			profile = Profile.objects.get(user=self.user)
			format, imgstr = self.photo.split(';base64,')
			ext = format.split('/')[-1]
			img = ContentFile(base64.b64decode(imgstr), name=get_photo_name() + '.' + ext)

			p = Photo.objects.create(
				user=profile,
				name=self.name,
				description=self.description,
				img=img
			)
			p.save()
			return True
		except Exception as e:
			print(e)
			return False
