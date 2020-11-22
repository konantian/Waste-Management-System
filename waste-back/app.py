from flask import Flask, request,  jsonify
import sqlite3
app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run()