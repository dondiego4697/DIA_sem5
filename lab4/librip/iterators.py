# Итератор для удаления дубликатов
class Unique(object):
	def __init__(self, items, **kwargs):
		self.ignore_case = kwargs.get('ignore_case', False)
		self.items = self.__uniq_list(items)
		self.index = 0
		self.length = len(self.items)

	def __next__(self):
		if self.index == self.length:
			raise StopIteration
		self.index += 1
		return self.items[self.index - 1]

	def __iter__(self):
		return self

	def __uniq_list(self, lst):
		checker = {}
		result = []
		if self.ignore_case:
			for el in lst:
				if el.lower() not in checker:
					checker[el.lower()] = True
					result.append(el)
		else:
			for el in lst:
				if el not in checker:
					checker[el] = True
					result.append(el)

		return result
