from . import *

class CheckExistingEmail(Resource):
    def __init__(self):
        Resource.__init__(self)

        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('email', type = str, required = True, location = 'json', help = 'must contain an email for checking')

    def post(self):
        data = self.reqparser.parse_args()

        # check if existing user
        email = data['email']
        try:
            db.session.query(User.email).filter_by(email=email).one()
            return flask.jsonify({
                    "email": email,
                    "is_unique": False
                })
        except orm.exc.NoResultFound as notFound:
            return flask.jsonify({
                    "email": email,
                    "is_unique": True
                })

