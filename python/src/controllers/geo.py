from repository.geo import GeoRepository
from lib.controller import BaseController, as_json


class CitiesAPI(BaseController):
    @as_json
    def get(self):
        region_id = int(self.qs['region_id'][0])
        repository = GeoRepository(self.db)
        return repository.get_cities_by_region(region_id)


class RegionAPI(BaseController):
    @as_json
    def get(self):
        repository = GeoRepository(self.db)
        return repository.get_regions()
