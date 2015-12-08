from user import app, db, User
from flask_sqlalchemy import orm
from flask import request
import flask

@app.route('/api/login', methods=['POST'])
def login():
    data        = request.get_json()
    print(data)
    username    = data['username']
    password    = data['password']
    try:
        user = db.session.query(User).filter_by(email=username).one()
    except orm.exc.NoResultFound as noUser:
        return flask.jsonify({"auth_failure": "username/email does not exists"})
    if user.check_password(password):
        token = user.generate_token()
        db.session.add(user)
        db.session.commit()
        return flask.jsonify({
            "status"    :   "login success",
            "api_token" :   token})
    else:
        return flask.jsonify({"auth_failure": "password mismatch"})

@app.route('/api/get_user_details', methods=['POST'])
def get_details():
    data        = request.get_json()
    token       = data['api_token']
    username    = data['username']

    user = db.session.query(User).filter_by(token=token).one()

    if not user:
        return flask.jsonify({"auth_failure": "invalid token"})
    else:
        return user.jsonify()

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data.get('username'):
        return flask.jsonify({
            "api_error": "invalid request"
            })

    elif data.get('check_existing') == True:
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

    else:
        # request for new user signup
        data = request.get_json()
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

@app.route('/')
@app.route('/login')
def index():
    return app.send_static_file('html/index.html')

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
