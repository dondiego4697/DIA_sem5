def print_list(lst):
	print(', '.join(map(str, lst)))


data = range(1, 10)

print_list([i*i for i in data])
print_list(map(lambda x: x*x, data))
