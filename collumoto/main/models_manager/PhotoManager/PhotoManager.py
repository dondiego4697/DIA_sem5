from django.http import Http404

from main.models import *


class PhotoManager(models.Manager):
	def get_by_id(self, _id):
		try:
			photo = self.get(pk=_id)
		except Photo.DoesNotExist:
			raise Http404("Photo does not exist")
		return photo

	def is_liked(self, user_id, photo_id):
		return

	def get_likes_count(self, _id):
		return
