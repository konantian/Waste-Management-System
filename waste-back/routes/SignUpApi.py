from flask import request, jsonify, make_response
from authValidator import Validator
from . import routes

@routes.route("/api/signup/", methods=["POST"])
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
