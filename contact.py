from flask import Blueprint
from flask import jsonify
contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/hello/')
def hello():
    return "Hello from Contact Page"