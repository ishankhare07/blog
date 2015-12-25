from flask_sqlalchemy import SQLAlchemy

__all__ = ['User', 'db']

db = SQLAlchemy()

from .user import User
