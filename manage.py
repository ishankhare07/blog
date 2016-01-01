from flask.ext.script import Shell, Manager

from app import *
from app.models import *

def _make_context():
    return dict(app=app, db=db, User=User, Role=Role)

manager = Manager(app)
manager.add_command('shell', Shell(make_context=_make_context))

if __name__ == '__main__':
    manager.run()
