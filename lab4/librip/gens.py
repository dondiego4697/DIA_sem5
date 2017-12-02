import random


# Генератор вычленения полей из массива словарей
# Пример:
# goods = [
#    {'title': 'Ковер', 'price': 2000, 'color': 'green'},
#    {'title': 'Диван для отдыха', 'price': 5300, 'color': 'black'}
# ]
# field(goods, 'title') должен выдавать 'Ковер', 'Диван для отдыха'
# field(goods, 'title', 'price') должен выдавать {'title': 'Ковер', 'price': 2000}, {'title': 'Диван для отдыха', 'price': 5300}

def field(items, *args):
	assert len(args) > 0

	if len(args) == 1:
		for item in items:
			if args[0] in item and item[args[0]]:
				yield item[args[0]]
	else:
		for item in items:
			result = {}
			for a in args:
				if a in item and item[a]:
					result[a] = item[a]
			if result:
				yield result


def gen_random(begin, end, num_count):
	for count in range(num_count):
		yield random.randint(begin, end)
