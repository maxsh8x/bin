from lib.repository import BaseRepository


class GeoRepository(BaseRepository):
    def get_cities_by_region(self, region_id):
        c = self.conn.cursor()
        query = '''
          SELECT id, name, region_id FROM city 
          WHERE region_id = ?
        '''
        c.execute(query, (region_id,))
        return c.fetchall()

    def get_regions(self):
        c = self.conn.cursor()
        query = '''
          SELECT id, name FROM region 
        '''
        c.execute(query)
        return c.fetchall()

    def get_regions_by_comments(self, gt=5):
        c = self.conn.cursor()
        query = ''' SELECT region_id, comments_count, region.name FROM
          (SELECT city.region_id, COUNT(city.region_id) AS comments_count
          FROM comments JOIN city ON comments.city_id = city.id
          GROUP BY city.region_id) JOIN region ON region_id = region.id
          WHERE comments_count > ?
        '''
        c.execute(query, (gt,))
        return c.fetchall()
