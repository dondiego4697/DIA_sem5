#!/usr/bin/env python3
import json
import sys
from librip.ctxmngrs import timer
from librip.decorators import print_result
from librip.gens import field, gen_random
from librip.iterators import Unique as unique, Unique

path = 'data_light.json'

with open(path) as f:
    data = json.load(f)


@print_result
def f1(arg):
    uni = Unique([i for i in field(arg, 'job-name')], ignore_case=True)
    return sorted([i for i in uni])


@print_result
def f2(arg):
    return list(filter(lambda x: x.startswith(u'программист') or x.startswith(u'Программист'), arg))


@print_result
def f3(arg):
    return list(map(lambda x: x + u' с опытом Python', arg))


@print_result
def f4(arg):
    salary = [x for x in gen_random(100000, 200000, len(arg))]
    return ['{} , зарплата {} руб'.format(job, sal) for job, sal in zip(arg, salary)]


with timer():
    f4(f3(f2(f1(data))))
