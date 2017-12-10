from django.db import models
from django.contrib.auth.models import User
from django.http import Http404


class PhotoManager(models.Manager):
	def get_by_id(self, _id):
		try:
			photo = self.get(pk=_id)
		except Photo.DoesNotExist:
			raise Http404("Photo does not exist")
		return photo

	def is_liked(self, profile, photo):
		user_likes = photo.likes.filter(user=profile)
		first_like = user_likes.first()
		like = None
		if first_like is not None:
			like = Like.objects.get(id=first_like.id)
		if len(user_likes) == 0:
			return None

		return like.like

	def get_likes_count(self, _id):
		return

	def get_questions_for_list(self, limit, offset):
		return self.order_by('-pub_date')[offset:limit + offset]

	def get_questions_for_list_with_likes(self, limit, offset, user):
		query = self.get_questions_for_list(limit, offset)
		profile = Profile.objects.get(user=user)
		for item in query:
			is_liked = self.is_liked(profile, item)
			item.is_liked = False if is_liked is None or not is_liked else True
			item.likes_count = item.likes.all().filter(like=True).count()
		return query


class LikeManager(models.Manager):
	def get_by_id(self, _id):
		try:
			like = self.get(pk=_id)
		except Like.DoesNotExist:
			raise Http404("Like does not exist")
		return like


class ProfileManager(models.Manager):
	def get_by_id(self, user_id):
		try:
			user = self.get(user=user_id)
		except Profile.DoesNotExist:
			raise Http404("Photo does not exist")
		return user


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
	img = models.FileField(upload_to='photos', null=False, blank=False)
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
