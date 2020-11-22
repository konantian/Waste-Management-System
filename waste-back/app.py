from flask import Flask, request, jsonify, make_response
from validator import Validator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/signup/", methods=["POST"])
def signup():

    validator = Validator()
    data = request.json
    userId = data.get("userId")

    if not validator.check_pid(userId):
        return make_response(
            jsonify({"error": "This userId does not exist, please enter again"}), 400
        )
    if validator.check_exist_pid(userId):
        return make_response(
            jsonify({"error": "This userId is already exist, please login directly"}),
            400,
        )
    role = data.get("role")
    if not validator.check_role(userId, role):
        return make_response(
            jsonify({"error": "The role entered is not matched, please enter again"}),
            400,
        )
    login = data.get("login")
    if validator.check_username(login):
        return make_response(
            jsonify(
                {
                    "error": "This username has been occupied, please select another username"
                }
            ),
            400,
        )
    password = data.get("password")
    validator.register(userId, role, login, password)

    return make_response(jsonify({"success": "You are ready to log in"}), 201)


@app.route("/api/login/", methods=["POST"])
def login():

    validator = Validator()
    data = request.json
    username = data.get("username")
    if not validator.check_username(username):
        return make_response(
            jsonify(
                {"error": "The username inputed does not exist, please input again "}
            ),
            401,
        )
    password = data.get("password")
    if not validator.check_password(username, password):
        return make_response(
            jsonify(
                {
                    "error": "The username and password entered is not matched, please input again"
                }
            ),
            401,
        )
    role = validator.getRole(username)
    role = "accountManager" if role == "account manager" else role
    userId = validator.getUserId(username)
    return make_response(
        jsonify(
            {
                "success": "Welcome to the waste management system!",
                "role": role,
                "userId": userId,
            }
        ),
        200,
    )


if __name__ == "__main__":
    app.run()
