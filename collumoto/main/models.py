from django.db import models
from django.contrib.auth.models import User
from main.models_manager.ProfileManager.ProfileManager import ProfileManager
from main.models_manager.PhotoManager.PhotoManager import PhotoManager
from main.models_manager.LikeManager.LikeManager import LikeManager


class Profile(models.Model):
	user = models.OneToOneField(User)
	nickname = models.CharField(max_length=255)
	objects = ProfileManager()

	def __str__(self):
		return "{} {}".format(self.user.id, self.nickname)


class Photo(models.Model):
	user = models.ForeignKey('Profile')
	name = models.CharField(max_length=120)
	description = models.CharField(max_length=255)
	img = models.ImageField(upload_to='photos', null=False, blank=False)
	likes = models.ManyToManyField('Like')
	pub_date = models.DateTimeField(auto_now_add=True)
	objects = PhotoManager()

	def __str__(self):
		return "{}".format(self.name)


class Like(models.Model):
	user = models.ForeignKey('Profile')
	like = models.BooleanField()
	objects = LikeManager()

	def __str__(self):
		return "{}".format(self.user.id)



