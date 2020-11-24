from flask import request, jsonify, make_response
from validators import ManagerValidator
from . import routes


@routes.route("/api/accountManager/listInformation/", methods=["GET"])
def list_information():

    validator = ManagerValidator()
    pid = request.args.get('pid')
    account = request.args.get('account')
    if not validator.check_account(account, pid):
        return make_response(
            jsonify(
                {
                    "error": "The master account you inputed does not exist or you have no access right on that account "
                }
            ),
            401,
        )
    custom_information = validator.custom_information(account)
    return make_response(jsonify(custom_information), 200)
