from flask import Blueprint, request, jsonify
from database import f_sql_insert, f_sql_get, f_sql_delete, f_sql_update
from token_verification import token_required

client_file = Blueprint('client', __name__)


@client_file.route('/clients', methods=['GET'])
@token_required
def getClients(self):
    clients = []
    for client in f_sql_get("SELECT * FROM [client]"):
        clients.append({
            'id': client.id,
            'code': client.code,
            'name': client.name,
            'city': client.city
        })

    return jsonify(clients)


@client_file.route('/client', methods=['POST'])
@token_required
def createClient(self):
    dataset = request.json
    sqlList = (", ".join(["'"+str(item)+"'" for item in dataset.values()]))
    sqlList = sqlList.replace("'None'", "NULL")
    id = f_sql_insert("INSERT INTO [client] VALUES (%s)" % (sqlList))

    return jsonify(str(id))


@client_file.route('/client/<id>', methods=['GET'])
@token_required
def getClient(self, id):
    client = {}
    for item in f_sql_get("SELECT * FROM [client] WHERE id = " + id):
        client = {
            'id': item.id,
            'code': item.code,
            'name': item.name,
            'city': item.city
        }

    return jsonify(client)


@client_file.route('/client/<id>', methods=['DELETE'])
@token_required
def deleteClient(self, id):
    f_sql_delete('client', id)

    return jsonify({'msg': 'Client deleted'})


@client_file.route('/client/<id>', methods=['PUT'])
@token_required
def updateClient(self, id):
    dataset = request.json
    sqlList = (", ".join([str(key)+" = '"+str(item) +
               "'" for key, item in dataset.items()]))
    f_sql_update(f"UPDATE [client] SET {sqlList} WHERE id = {id}")

    return jsonify({'msg': 'Client updated'})
