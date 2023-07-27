from flask import Flask, request, jsonify
from flask_cors import CORS
from database import f_sql_insert, f_sql_get, f_sql_delete, f_sql_update

app = Flask(__name__)

CORS(app)


@app.route('/user', methods=['POST'])
def createUser():
    dataset = request.json
    sqlList = (", ".join(["'"+str(item)+"'" for item in dataset.values()]))
    sqlList = sqlList.replace("'None'", "NULL")
    id = f_sql_insert("INSERT INTO [user] VALUES (%s)" % (sqlList))

    return jsonify(str(id))


@app.route('/users', methods=['GET'])
def getUsers():
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


@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = {}
    for user in f_sql_get("SELECT * FROM [user] WHERE id = " + id):
        user = {
            'id': user.id,
            'name': user.name,
            'last_name': user.last_name,
            'email': user.email,
            'password': user.password,
            'photo': user.photo
        }

    return jsonify(user)


@app.route('/user/<id>', methods=['DELETE'])
def deleteUser(id):
    f_sql_delete('user', id)

    return jsonify({'msg': 'User deleted'})


@app.route('/user/<id>', methods=['PUT'])
def updateUser(id):
    dataset = request.json
    sqlList = (", ".join([str(key)+" = '"+str(item) +
               "'" for key, item in dataset.items()]))
    f_sql_update(f"UPDATE [user] SET {sqlList} WHERE id = {id}")

    return jsonify({'msg': 'User updated'})


if __name__ == "__main__":
    app.run(debug=True, port=8001)
