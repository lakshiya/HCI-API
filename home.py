from flask import Blueprint
from flask import jsonify
home_bp = Blueprint('home', __name__)

@home_bp.route('/hello/')
def hello():
    return jsonify({'message':"Hello from Home Page, this is response from FLASK",
                    'extra':'India'}) 