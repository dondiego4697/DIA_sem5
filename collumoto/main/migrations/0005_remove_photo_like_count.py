# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-02 16:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20171202_1635'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='like_count',
        ),
    ]
