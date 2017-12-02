from django.contrib import admin

from main.models import *


class ProfileAdmin(admin.ModelAdmin):
	list_display = ('user', 'nickname')


class PhotoAdmin(admin.ModelAdmin):
	list_display = ('user', 'name', 'description', 'img', 'pub_date')


class LikeAdmin(admin.ModelAdmin):
	list_display = ('user', 'like')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Like, LikeAdmin)
