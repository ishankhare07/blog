from . import db


class Role(db.Model):
    __tablename__ = 'roles'
    id      = db.Column(db.Integer, primary_key = True)
    name    = db.Column(db.String, unique = True)
    default = db.Column(db.Boolean, default = False, index = True)
    permissions = db.Column(db.Integer)
    users   = db.relationship('User', backref='role', lazy='dynamic')

    @staticmethod
    def insert_roles():
        roles = {
            'User': (Permissions.FOLLOW |
                    Permissions.COMMENT |
                    Permissions.WRITE_ARTICLES, True),
            'Moderator': (Permissions.FOLLOW |
                        Permissions.COMMENT |
                        Permissions.WRITE_ARTICLES |
                        Permissions.MODERATE_COMMENTS, False),
            'Administrator': (0xff, False)
        }

        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
                role.permissions = roles[r][0]
                role.default = roles[r][1]
                db.session.add(role)
        db.session.commit()

    def __repr__(self):
        return '<Role: {0}, id: {1}>'.format(self.name, self.id)

class Permissions:
    FOLLOW              = 0x01
    COMMENT             = 0x02
    WRITE_ARTICLES      = 0x04
    MODERATE_COMMENTS   = 0x08
    ADMINISTRATOR       = 0X80
