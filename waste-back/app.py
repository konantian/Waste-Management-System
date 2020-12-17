from flask import Flask
from flask_cors import CORS
from routes import *

app = Flask(__name__)
app.register_blueprint(routes)
CORS(app)


if __name__ == "__main__":
    app.run(debug=True)
