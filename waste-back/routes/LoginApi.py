from flask import request, jsonify, make_response
from authValidator import Validator
from . import routes

@routes.route("/api/login/", methods=["POST"])
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
