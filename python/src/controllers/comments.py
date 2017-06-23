from repository.comments import CommentsRepository
from lib.controller import BaseController, as_json, as_view
from lib.json import process_data


class CommentsAPI(BaseController):
    @as_json
    def get(self):
        repository = CommentsRepository(self.db)
        return repository.get_comments()

    @as_json
    def post(self):
        repository = CommentsRepository(self.db)
        data = process_data(self.ctx['req']['json_body'], {
            "first_name": {"type": "string", "required": True},
            "last_name": {"type": "string", "required": True},
            "middle_name": {"type": "string"},
            "city_id": {"type": "integer"},
            "phone": {"type": "string"},
            "email": {"type": "string"},
            "comment": {"type": "string", "required": True},
        })
        if data:
            repository.post_comment(data)

    @as_json
    def delete(self):
        comment_id = int(self.qs['id'][0])
        repository = CommentsRepository(self.db)
        repository.delete_comment(comment_id)


class Comments(BaseController):
    @as_view
    def get(self):
        return self.render('comments/add')


class CommentsView(BaseController):
    @as_view
    def get(self):
        return self.render('comments/list')
