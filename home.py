from flask import Blueprint
from flask import jsonify
home_bp = Blueprint('home', __name__)

@home_bp.route('/hello/', methods = ['GET'])
def hello():
    return jsonify({"message":"Hello from Home Page, this is response from FLASK",
                    "extra":"India"}) 

# Medical assistance : Provide information on mandatory health insurance, 
# local healthcare providers, and the process of seeking medical assistance.


@home_bp.route('/medical/', methods = ['GET'])
def medical():
    return jsonify({"message":"Infirmary Building is located at 280 Fletcher Drive Gainesville, FL 32611. Call 352-392-1161 to book appointments for a visit",
                    "extra":"Sample"}) 

@home_bp.route('/wellness/', methods = ['GET'])
def wellness():
    return jsonify({"message":"Student Health Psychiatry at Counseling & Wellness Ctr is located at 3190 Radio Road 1st Floor Gainesville, FL 32611. Hours of operation: Monday to Friday from 8 a.m. to 5 p.m.",
                    "extra":"Sample"}) 


@home_bp.route('/emergency/', methods = ['GET'])
def emergency():
    return jsonify({"message":"UF Health Shands Emergency Room / Trauma Center is located at 1515 SW Archer Road Gainesville, FL 32608. The Trauma Emergency Room is open 24 hours a day. If you have an emergency, please call 911, consult your doctor or go directly to the emergency room. ",
                    "extra":"India"}) 