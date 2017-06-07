## Requirements:
Python >= 3.6

## API

### GET /api/city/?region_id=1
#### Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Краснодар",
      "region_id": 1
    }
  ]
}
```
### GET /api/comment/
#### Response:
```json
{
  "data": [
    {
      "id": 1,
      "first_name": "dada",
      "last_name": "dsda",
      "comment": "dsadas"
    }
  ]
}
```

### POST /api/comment/
#### JSON Body scheme
```json
{
  "first_name": {"type": "string", "required": true},
  "last_name": {"type": "string", "required": true},
  "middle_name": {"type": "string"},
  "city_id": {"type": "integer"},
  "phone": {"type": "string"},
  "email": {"type": "string"},
  "comment": {"type": "string", "required": true}
}
```
#### Response: Status Code

### DELETE /api/comment/?id=1
#### Response:  Status Code

### GET /api/stat/by_regions/
#### Response:
```json
{
  "data": [
    {
      "region_id": 1,
      "comments_count": 6,
      "name": "Краснодарский край"
    }
  ]
}
```

### GET /api/stat/by_cities/
#### Response:
```json
{
  "data": [
    {
      "comments_count": 6,
      "name": "Краснодар"
    }
  ]
}
```
## TODO
...