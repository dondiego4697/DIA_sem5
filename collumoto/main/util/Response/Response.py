import json

from django.http import HttpResponse


class Response:
	@staticmethod
	def get_error(msg='Wrong data'):
		return {
			'status': 'error',
			'message': msg
		}

	@staticmethod
	def get_success(msg=''):
		return {
			'status': 'ok',
			'message': msg
		}

	@staticmethod
	def send400(msg=None):
		return HttpResponse(json.dumps(Response.get_error(msg)), content_type='application/json', status=400)

	@staticmethod
	def send200(msg=None):
		return HttpResponse(json.dumps(Response.get_success(msg)), content_type='application/json', status=200)
