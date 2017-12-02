from django.http import Http404

from main.models import *


class ProfileManager(models.Manager):
	def get_by_id(self, user_id):
		try:
			user = self.get(user=user_id)
		except Profile.DoesNotExist:
			raise Http404("Photo does not exist")
		return user
