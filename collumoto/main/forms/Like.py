from main.models import Profile, Like, Photo


class LikeForm:
	def __init__(self, user, like, photo_id):
		self.photo_id = int(photo_id)
		self.like = (like == 'true')
		self.user = user

	def validate(self):
		if not self.photo_id and self.photo_id != 0 or not self.user.is_authenticated():
			return False
		return True

	def create_like(self):
		profile = Profile.objects.get(user=self.user)
		photo = Photo.objects.get(id=self.photo_id)
		is_liked = Photo.objects.is_liked(profile, photo)
		if is_liked is None:
			new_like = Like.objects.create(user=profile, like=self.like)
			photo.likes.add(new_like)
		else:
			first_like = photo.likes.filter(user=profile).first()
			like = Like.objects.get(id=first_like.id)
			like.like = self.like
			like.save()
		return self.like
