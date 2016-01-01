from flask_sqlalchemy import SQLAlchemy

__all__ = ['User', 'db', 'Role']

db = SQLAlchemy()

from .user import User
from .roles import Role
