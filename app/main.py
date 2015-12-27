from .models import db, User
from flask_sqlalchemy import orm
from flask_restful import Resource, Api, reqparse
from flask import Flask
import flask
import os

app = Flask(__name__)
db.init_app(app)
api = Api(app)

try:
    # running on heroku
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
except KeyError:
    # running on localhost
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://test:test@localhost'

class Login(Resource):
    def __init__(self):
        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('username', type = str, required = True, help = 'no username provided', location = 'json')
        self.reqparser.add_argument('password', type = str, required = True, help = 'password is required', location = 'json')
        Resource.__init__(self)

    def post(self):
        args = self.reqparser.parse_args()

        user = db.session.query(User).filter_by(email=args['username']).all()
        if not user:
            return flask.jsonify({"error": "username/email does not exists"})
        else:
            if user[0].check_password(args['password']):
                token = user[0].generate_token()
                db.session.add(user[0])
                db.session.commit()
                return flask.jsonify({
                        "status"    : "login success",
                        "api_token" : token
                    })
            else:
                return flask.jsonify({"auth_failure": "password mismatch"})


class GetDetails(Resource):
    def __init__(self):
        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('api_token', type = str, required = True, help = 'request needs to have your api token', location = 'json')
        self.reqparser.add_argument('username', type = str, required = True, help = 'request needs to specify username for which details are to be fetched', location = 'json')

    def post(self):
        args = self.reqparser.parse_args()

        user = db.session.query(User).filter_by(token=args['token']).all()

        if not user:
            return flask.jsonify({"auth_failure": "invalid token"})
        else:
            return user[0].jsonify()

class CheckExistingEmail(Resource):
    def __init__(self):
        Resource.__init__(self)

        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('username', type = str, required = True, location = 'json', help = 'must contain an email for checking')

    def post(self):
        data = self.reqparser.parse_args()

        # check if existing user
        username = data['username']
        try:
            db.session.query(User.email).filter_by(email=username).one()
            return flask.jsonify({
                    "username": username,
                    "is_unique": False
                })
        except orm.exc.NoResultFound as notFound:
            return flask.jsonify({
                    "username": username,
                    "is_unique": True
                })


class Signup(Resource):
    def __init__(self):
        Resource.__init__(self)

        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('username', type = str, required = True, help = 'must contain the username', location = 'json')
        self.reqparser.add_argument('firstname', type = str, required = True, help = 'must contain firstname', location = 'json')
        self.reqparser.add_argument('lastname', type = str, required = True, help = 'must contain lastname', location = 'json')
        self.reqparser.add_argument('password', type = str, required = True, help = 'password must not be null', location = 'json')

    def post(self):
        data = self.reqparser.parse_args()

        # request for new user signup
        firstname = data['firstname']
        lastname = data['lastname']
        email = data['username']
        password = data['password']

        user = User(firstname,
                    lastname,
                    email,
                    password)

        db.session.add(user)
        db.session.commit()

        return flask.jsonify({
            "status": "signup successful",
            "api_token": user.generate_token()
            })

api.add_resource(Login,'/api/login')
api.add_resource(GetDetails, '/api/get_user_details')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckExistingEmail, '/api/checkExistingEmail')

@app.route('/')
@app.route('/login')
def index():
    return app.send_static_file('html/index.html')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=False)
