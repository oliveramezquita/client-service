from flask import Blueprint, request, jsonify, make_response
from database import f_sql_insert, f_sql_get, f_sql_delete, f_sql_update
from werkzeug.security import generate_password_hash
from token_verification import token_required

user_file = Blueprint('user', __name__)


@user_file.route('/users', methods=['GET'])
@token_required
def getUsers(self):
    users = []
    for user in f_sql_get("SELECT * FROM [user]"):
        users.append({
            'id': user.id,
            'name': user.name,
            'last_name': user.last_name,
            'email': user.email,
            'photo': user.photo
        })

    return jsonify(users)


@user_file.route('/user', methods=['POST'])
@token_required
def createUser(self):
    dataset = request.json

    user = {}
    for item in f_sql_get(f"SELECT * FROM [user] WHERE email = '{dataset['email']}'"):
        user = {
            'id': item.id,
        }

    if not user:
        dataset['password'] = generate_password_hash(dataset['password'])
        sqlList = (", ".join(["'"+str(item)+"'" for item in dataset.values()]))
        sqlList = sqlList.replace("'None'", "NULL")
        id = f_sql_insert("INSERT INTO [user] VALUES (%s)" % (sqlList))

        return jsonify(str(id))
    else:
        return make_response('User already exists', 202)


@user_file.route('/user/<id>', methods=['GET'])
@token_required
def getUser(self, id):
    user = {}
    for item in f_sql_get("SELECT * FROM [user] WHERE id = " + id):
        user = {
            'id': item.id,
            'name': item.name,
            'last_name': item.last_name,
            'email': item.email,
            'password': item.password,
            'photo': item.photo
        }

    return jsonify(user)


@user_file.route('/user/<id>', methods=['DELETE'])
@token_required
def deleteUser(self, id):
    f_sql_delete('user', id)

    return jsonify({'msg': 'User deleted'})


@user_file.route('/user/<id>', methods=['PUT'])
@token_required
def updateUser(self, id):
    dataset = request.json
    sqlList = (", ".join([str(key)+" = '"+str(item) +
               "'" for key, item in dataset.items()]))
    f_sql_update(f"UPDATE [user] SET {sqlList} WHERE id = {id}")

    return jsonify({'msg': 'User updated'})
