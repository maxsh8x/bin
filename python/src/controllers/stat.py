from repository.geo import GeoRepository
from repository.comments import CommentsRepository
from lib.controller import BaseController, as_json, as_view


class StatByRegionsAPI(BaseController):
    @as_json
    def get(self):
        repository = GeoRepository(self.db)
        return repository.get_regions_by_comments()


class StatByCitiesAPI(BaseController):
    @as_json
    def get(self):
        region_id = int(self.qs['region_id'][0])
        repository = CommentsRepository(self.db)
        return repository.get_comments_count(region_id)


class Stat(BaseController):
    @as_view
    def get(self):
        region_id = self.qs.get('region_id')
        if region_id:
            mapping = {"region_id": int(region_id[0])}
            return self.render('stat/list_by_cities', mapping)
        return self.render('stat/list_by_regions')
