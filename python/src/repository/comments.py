from lib.repository import BaseRepository


class CommentsRepository(BaseRepository):
    def get_comments(self):
        c = self.conn.cursor()
        query = '''
            SELECT id, first_name, last_name, comment FROM comments;
        '''
        c.execute(query)
        return c.fetchall()

    def post_comment(self, data):
        c = self.conn.cursor()
        query = '''
            INSERT INTO comments (first_name, last_name, middle_name, 
            city_id, phone, email, comment)
            VALUES (:first_name, :last_name, :middle_name, 
            :city_id, :phone, :email, :comment);
        '''
        c.execute(query, data)
        self.conn.commit()

    def delete_comment(self, comment_id):
        c = self.conn.cursor()
        query = '''
           DELETE FROM comments WHERE ID = ?;
        '''
        c.execute(query, (comment_id,))
        self.conn.commit()

    def get_comments_count(self, region_id):
        c = self.conn.cursor()
        query = '''
            SELECT COUNT(comments.city_id) AS comments_count, city_name AS name
            FROM (SELECT id AS city_by_region, name AS city_name
            FROM city WHERE region_id = ?)
            JOIN comments ON city_by_region = comments.city_id
            GROUP BY comments.city_id
        '''
        c.execute(query, (region_id,))
        return c.fetchall()
