from django.http import Http404

from main.models import *


class LikeManager(models.Manager):
	def get_by_id(self, _id):
		try:
			like = self.get(pk=_id)
		except Like.DoesNotExist:
			raise Http404("Like does not exist")
		return like

