from ..models import User
from ..auth import authorize
from . import *
import flask

class GetDetails(Resource):
    def __init__(self):
        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('api_token', type = str, required = True, help = 'request needs to have your api token', location = 'json')
        self.reqparser.add_argument('email', type = str, required = True, help = 'request needs to specify email for which details are to be fetched', location = 'json')

    @authorize
    def post(self):
        args = self.reqparser.parse_args()

        user_data = db.session.query(User.id,
                User.firstname,
                User.lastname,
                User.email,
                User.location,
                User.about_me,
                User.member_since,
                User.last_seen).filter_by(email=args['email']).all()

        if not user_data:
            print('should return this')
            return flask.jsonify({"auth_failure": "invalid token"})
        else:
            user_data = user_data[0]
            return flask.jsonify({
                    "id"            : user_data.id,
                    "firstname"     : user_data.firstname,
                    "lastname"      : user_data.lastname,
                    "email"         : user_data.email,
                    "location"      : user_data.location,
                    "about_me"      : user_data.about_me,
                    "member_since"  : user_data.member_since,
                    "last_seen"     : user_data.last_seen
                })

