from functools import wraps
from . import JWT
from itsdangerous import BadSignature
import flask
import datetime
from .models import User
from . import db

def authorize(f, *args, **kwargs):
    @wraps(f)
    def wrapper(*args, **kwargs):
        instance = args[0]
        json_args = instance.reqparser.parse_args()
        token = json_args.get('api_token')

        # parsing token
        try:
            token_data = JWT.loads(token)
        except BadSignature as e:
            print(e)
            return flask.jsonify({
                'auth_error': 'invalid token'
                })

        # check expiry
        if datetime.datetime.now().timestamp() < token_data.get('expires_at'):
            # token still valid
            # updating lastseen of user
            print('valid token')
            user = db.session.query(User).filter_by(id=token_data['id']).all()
            user[0].last_seen = datetime.datetime.now()
            db.session.add(user[0])
            db.session.commit()

            # call the origin function
            return f(*args, **kwargs)

        else:
            # token expired
            print("Expired token")
            return flask.jsonify({
                'auth_error' : 'token expired',
                'help'  : 'get a new token from login endpoint'
                })
    return wrapper

