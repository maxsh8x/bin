from controllers.geo import CitiesAPI, RegionAPI
from controllers.comments import CommentsAPI, CommentsView, Comments
from controllers.stat import StatByRegionsAPI, StatByCitiesAPI, Stat

routes = [
    ("/api/city/", CitiesAPI),

    ("/api/region/", RegionAPI),

    ("/api/comment/", CommentsAPI),
    ("/comment/", Comments),
    ("/view/", CommentsView),

    ("/api/stat/by_regions/", StatByRegionsAPI),
    ("/api/stat/by_cities/", StatByCitiesAPI),
    ("/stat/", Stat),
]
