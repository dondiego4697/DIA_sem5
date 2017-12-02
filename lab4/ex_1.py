#!/usr/bin/env python3
from librip.gens import field, gen_random


def print_list(lst):
	print(', '.join(map(str, lst)))


goods = [
	{'title': 'Ковер', 'price': 2000, 'color': 'green'},
	{'title': 'Диван для отдыха', 'price': 5300, 'color': 'black'},
	{'title': 'Стелаж', 'price': 7000, 'color': 'white'},
	{'title': 'Вешалка для одежды', 'price': 800, 'color': 'white'},
	{'title': None, 'price': 800, 'color': 'white'}
]

res_list = []

for item in field(goods, 'title', 'color'):
	res_list.append(item)
print_list(res_list)
print_list([i for i in gen_random(1, 3, 5)])
