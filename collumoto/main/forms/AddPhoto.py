from main.models import Photo, Profile


class AddPhoto:
	def __init__(self, data, user):
		self.user = user
		self.name = data['name']
		self.description = data['description']
		self.photo = data['photo']

	def validate(self):
		if not self.name or not self.description or not self.photo or not self.user.is_authenticated():
			return False
		return True

	def add(self):
		try:
			profile = Profile.objects.get(user=self.user)
			p = Photo.objects.create(
				user=profile,
				name=self.name,
				description=self.description,
				img=self.photo
			)
			p.save()
			return True
		except Exception as e:
			print(e)
			return False
