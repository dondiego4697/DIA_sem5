#!/usr/bin/env python3
from librip.gens import gen_random
from librip.iterators import Unique

data1 = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2]
data2 = gen_random(1, 3, 10)

u1 = Unique(data1)
u2 = Unique(data2)

print(' ,'.join(map(str, [i for i in u1])))
print(' ,'.join(map(str, [i for i in u2])))

