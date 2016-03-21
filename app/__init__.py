__all__ = ['app', 'JWT', 'db', 'api']

from itsdangerous import JSONWebSignatureSerializer as JWS
from flask import Flask
from flask_sqlalchemy import orm
from flask_restful import Api
from flask.ext.compress import Compress
from .models import db
import os

app = Flask(__name__)
db.init_app(app)
api = Api(app)
Compress(app)

# getting app secret
try:
    app.secret_key = os.environ['SECRET_KEY']
    JWT = JWS(app.secret_key)
except KeyError:
    print('Please set the Secret key')
    exit()

# getting database url
try:
    # running on heroku
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
except KeyError:
    # running on localhost
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://test:test@localhost'
