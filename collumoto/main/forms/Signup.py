from django.contrib.auth.models import User

from main.models import Profile


class Signup:
	def __init__(self, data):
		self.login = data['login']
		self.password = data['password']
		self.password_repeat = data['passwordRepeat']

	def validate(self):
		if not self.login or not self.password or not self.password_repeat:
			return False

		if self.password != self.password_repeat:
			return False

		return True

	def reg(self):
		try:
			user = User.objects.create_user(self.login, '', self.password)
			user.save()
			profile = Profile.objects.create(user=user, nickname=self.login)
			profile.save()
			return True
		except Exception:
			return False
