from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/person/')
def hello_person():
    return jsonify({'name':'Jimit',
                    'address':'India'})

@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!"

@app.route('/<int:number>/')
def incrementer(number):
    return "Incremented number is " + str(number+1)

@app.route('/<string:name>/')
def hello(name):
    return "Hello " + name


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)