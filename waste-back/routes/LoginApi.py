from flask import request, jsonify, make_response
from utils import AuthUtil
from . import routes


@routes.route("/api/login", methods=["POST"])
def login():

    util = AuthUtil()
    data = request.json
    username = data.get("username")
    if not util.check_username(username):
        return make_response(
            jsonify(
                {"error": "The username entered does not exist, please input again "}
            ),
            401,
        )
    password = data.get("password")
    if not util.check_password(username, password):
        return make_response(
            jsonify(
                {
                    "error": "The username and password entered is not matched, please input again"
                }
            ),
            401,
        )
    role = util.getRole(username)
    role = "accountManager" if role == "account manager" else role
    userId = util.getUserId(username)
    name = util.getName(userId)
    return make_response(
        jsonify(
            {
                "success": "Welcome to the waste management system!",
                "role": role,
                "userId": userId,
                "name": name,
            }
        ),
        200,
    )
