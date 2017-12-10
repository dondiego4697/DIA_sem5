from main.models import Photo


class GetPhotos:
	def __init__(self, limit, offset, user):
		self.limit = int(limit)
		self.offset = int(offset)
		self.user = user

	def validate(self):
		if not self.limit and self.limit != 0 or not self.offset and self.offset != 0 or not self.user.is_authenticated():
			return False
		return True

	def get_json(self):
		query_set = Photo.objects.get_questions_for_list_with_likes(self.limit, self.offset, self.user)
		result = list()
		for photo in query_set:
			date = photo.pub_date
			p = {
				'id': photo.id,
				'user': photo.user.nickname,
				'name': photo.name,
				'description': photo.description,
				'img': photo.img.url,
				'is_liked': photo.is_liked,
				'likes_count': photo.likes_count,
				'pub_date': "{}:{} {}.{}.{}".format(date.hour, date.minute, date.day, date.month, date.year)
			}
			result.append(p)
		return result
