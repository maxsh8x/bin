from functools import wraps
import json

from lib.constants import *
from lib.template import render


class BaseController:
    def __init__(self, ctx):
        self.ctx = ctx
        self.headers = [('Content-type', HTTP_HEADER_TEXT_PLAIN)]
        self.status = HTTP_STATUS_CODE_200
        self.render = render
        # Shortcuts
        self.db = self.ctx['app']['db']
        self.qs = self.ctx['req']['qs']

    def err_not_allowed(self):
        self.status = HTTP_STATUS_CODE_405
        return b''


def as_json(handler):
    @wraps(handler)
    def wrapper(obj):
        result = handler(obj)
        obj.headers = [('Content-type', HTTP_HEADER_APPLICATION_JSON)]
        response = {"data": result}
        return json.dumps(response, ensure_ascii=False).encode('utf-8')

    return wrapper


def as_view(handler):
    @wraps(handler)
    def wrapper(obj):
        result = handler(obj)
        obj.headers = [('Content-type', HTTP_HEADER_TEXT_HTML)]
        return result.encode('utf-8')

    return wrapper
