from flask import Blueprint
routes = Blueprint('routes', __name__)

from .LoginApi import *
from .SignUpApi import *
from .AccountManagerApi import *