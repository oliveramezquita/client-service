from flask import request, jsonify
from database import f_sql_get
from decouple import config
from functools import wraps

import jwt

secret_key = config('SECRET_KEY')


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:
            data = jwt.decode(token, secret_key)
            current_user = {}
            for item in f_sql_get(f"SELECT * FROM [user] WHERE id = {data['public_id']}"):
                current_user = {
                    'id': item.id,
                }

        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated
