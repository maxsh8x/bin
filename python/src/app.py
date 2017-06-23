from wsgiref.simple_server import make_server
from urllib.parse import parse_qs
import json

from lib.constants import *
from routes import routes
from lib import db

ctx = {'app': {}, 'req': {'qs': ''}}
ctx['app']['db'] = db.get_conn()


def application(env, start_response):
    ctx['req']['qs'] = parse_qs(env['QUERY_STRING'])
    path, method = env['PATH_INFO'], env['REQUEST_METHOD']

    request_body_size = 0
    if env.get('CONTENT_LENGTH', '').isdigit():
        request_body_size = int(env['CONTENT_LENGTH'])

    for route_path, Controller in routes:
        if route_path != path:
            continue

        if request_body_size > 0:
            request_body = env['wsgi.input'].read(request_body_size)
            ctx['req']['json_body'] = json.loads(request_body)
        controller = Controller(ctx)
        handler = getattr(
            controller,
            method.lower(),
            controller.err_not_allowed
        )
        response = handler()
        start_response(controller.status, controller.headers)
        return [response]

    headers = [('Content-type', HTTP_HEADER_TEXT_PLAIN)]
    start_response(HTTP_STATUS_CODE_404, headers)
    return [b'']


if __name__ == '__main__':
    with make_server('', 8000, application) as httpd:
        httpd.serve_forever()
