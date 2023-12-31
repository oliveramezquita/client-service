from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta
from decouple import config
from entities.user import user_file
from entities.city import city_file
from entities.client import client_file
from database import f_sql_get
from prefix import PrefixMiddleware

import jwt


app = Flask(__name__)

app.config['SECRET_KEY'] = config('SECRET_KEY')
app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix='/api')

CORS(app)

app.register_blueprint(user_file)
app.register_blueprint(city_file)
app.register_blueprint(client_file)


@app.route('/login', methods=['POST'])
def login():
    auth = request.json

    if not auth or not auth['email'] or not auth['password']:
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )

    user = {}
    for item in f_sql_get(f"SELECT * FROM [user] WHERE email = '{auth['email']}'"):
        user = {
            'id': item.id,
            'email': item.email,
            'password': item.password
        }

    if not user:
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist !!"'}
        )

    if check_password_hash(user['password'], auth['password']):
        token = jwt.encode({
            'public_id': user['id'],
            'exp': datetime.utcnow() + timedelta(minutes=300)
        }, app.config['SECRET_KEY'])

        return make_response(jsonify({'token': token.decode('UTF-8')}), 201)

    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password !!"'}
    )


if __name__ == "__main__":
    app.run(debug="True")
