from . import app, api

# import rest modules
from .rest.login import Login
from .rest.get_details import GetDetails
from .rest.signup import Signup
from .rest.check_existing_email import CheckExistingEmail


# map them to the routes
api.add_resource(Login,'/api/login')
api.add_resource(GetDetails, '/api/get_user_details')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckExistingEmail, '/api/checkExistingEmail')


# static routes
@app.route('/')
@app.route('/profile')
@app.route('/profile/edit')
def index():
    return app.send_static_file('html/index.html')


