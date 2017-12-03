from django.contrib.auth import authenticate


class Login:
	def __init__(self, data):
		self.login = data['login']
		self.password = data['password']

	def validate(self):
		if not self.login or not self.password:
			return False

		return True

	def auth(self):
		return authenticate(username=self.login, password=self.password)
