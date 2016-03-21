from . import *

class Signup(Resource):
    def __init__(self):
        Resource.__init__(self)

        self.reqparser = reqparse.RequestParser()
        self.reqparser.add_argument('email', type = str, required = True, help = 'must contain the username', location = 'json')
        self.reqparser.add_argument('firstname', type = str, required = True, help = 'must contain firstname', location = 'json')
        self.reqparser.add_argument('lastname', type = str, required = True, help = 'must contain lastname', location = 'json')
        self.reqparser.add_argument('password', type = str, required = True, help = 'password must not be null', location = 'json')

    def post(self):
        data = self.reqparser.parse_args()

        # request for new user signup
        firstname = data['firstname']
        lastname = data['lastname']
        email = data['email']
        password = data['password']

        user = User(firstname,
                    lastname,
                    email,
                    password,
                    db.session.query(Role.id).filter_by(name='User').first()[0])

        db.session.add(user)
        db.session.commit()

        return flask.jsonify({
            "status": "signup successful",
            "api_token": user.generate_token()
            })

