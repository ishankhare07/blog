from . import *
import flask    # for jsonify
from .. import JWT
from ..models import User
import datetime


class Login(Resource):
    def __init__(self):
        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('email', type = str, required = True, help = 'no username provided', location = 'json')
        self.reqparser.add_argument('password', type = str, required = True, help = 'password is required', location = 'json')
        Resource.__init__(self)

    def post(self):
        args = self.reqparser.parse_args()

        user = db.session.query(User).filter_by(email=args['email']).all()
        if not user:
            return flask.jsonify({"error": "email/email does not exists"})
        else:
            user = user[0]
            if user.check_password(args['password']):

                # generate token
                token = JWT.dumps({
                    "id":           user.id,
                    "email":        user.email,
                    "expires_at":   (datetime.datetime.now() +
                                    datetime.timedelta(seconds=2*60*60)).timestamp()       # 2 hrs
                    })

                # return generated token
                return flask.jsonify({
                        "status"    : "login success",
                        "api_token" : token.decode('utf-8'),
                        'id'        : user.id,
                        'email'     : user.email
                    })
            else:
                return flask.jsonify({"auth_failure": "password mismatch"})

