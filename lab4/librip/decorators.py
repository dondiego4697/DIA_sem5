# Здесь необходимо реализовать декоратор, print_result который принимает на вход функцию,
# вызывает её, печатает в консоль имя функции, печатает результат и возвращает значение
# Если функция вернула список (list), то значения должны выводиться в столбик
# Если функция вернула словарь (dict), то ключи и значения должны выводить в столбик через знак равно
# Пример из ex_4.py:
# @print_result
# def test_1():
#     return 1
#
# @print_result
# def test_2():
#     return 'iu'
#
# @print_result
# def test_3():
#     return {'a': 1, 'b': 2}
#
# @print_result
# def test_4():
#     return [1, 2]
#
# test_1()
# test_2()
# test_3()
# test_4()
#
# На консоль выведется:
# test_1
# 1
# test_2
# iu
# test_3
# a = 1
# b = 2
# test_4
# 1
# 2


def print_result(decorating_func):
	def decorated_func(*args, **kwargs):
		print(decorating_func.__name__)

		func_to_decorate_res = decorating_func(*args, **kwargs)
		if type(func_to_decorate_res) == list:
			for i in func_to_decorate_res:
				print(i)
		elif type(func_to_decorate_res) == dict:
			for i in func_to_decorate_res.keys():
				print('{} = {}'.format(i, func_to_decorate_res[i]))
		else:
			print(func_to_decorate_res)
		return func_to_decorate_res

	return decorated_func
