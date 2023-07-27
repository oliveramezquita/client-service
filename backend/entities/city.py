from flask import Blueprint, request, jsonify
from database import f_sql_insert, f_sql_get, f_sql_delete, f_sql_update
from token_verification import token_required

city_file = Blueprint('city', __name__)


@city_file.route('/cities', methods=['GET'])
@token_required
def getCities(self):
    cities = []
    for city in f_sql_get("SELECT * FROM [city]"):
        cities.append({
            'id': city.id,
            'code': city.code,
            'name': city.name
        })

    return jsonify(cities)


@city_file.route('/city', methods=['POST'])
@token_required
def createCity(self):
    dataset = request.json
    sqlList = (", ".join(["'"+str(item)+"'" for item in dataset.values()]))
    sqlList = sqlList.replace("'None'", "NULL")
    id = f_sql_insert("INSERT INTO [city] VALUES (%s)" % (sqlList))

    return jsonify(str(id))


@city_file.route('/city/<id>', methods=['GET'])
@token_required
def getCity(self, id):
    city = {}
    for item in f_sql_get("SELECT * FROM [city] WHERE id = " + id):
        city = {
            'id': item.id,
            'code': item.code,
            'name': item.name
        }

    return jsonify(city)


@city_file.route('/city/<id>', methods=['DELETE'])
@token_required
def deleteCity(self, id):
    f_sql_delete('city', id)

    return jsonify({'msg': 'City deleted'})


@city_file.route('/city/<id>', methods=['PUT'])
@token_required
def updateCity(self, id):
    dataset = request.json
    sqlList = (", ".join([str(key)+" = '"+str(item) +
               "'" for key, item in dataset.items()]))
    f_sql_update(f"UPDATE [city] SET {sqlList} WHERE id = {id}")

    return jsonify({'msg': 'City updated'})
