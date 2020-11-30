from flask import request, jsonify, make_response
from validators import ManagerValidator
from . import routes


@routes.route("/api/accountManager/listInformation/", methods=["GET"])
def list_information():

    validator = ManagerValidator()
    pid = request.args.get("pid")
    account = request.args.get("account")
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


@routes.route("/api/accountManager/createAccount/", methods=["POST"])
def create_master_account():

    validator = ManagerValidator()
    data = request.json
    pid = data.get("pid")
    account_no = data.get("account_no")
    if not validator.check_new_account(account_no):
        return make_response(
            jsonify(
                {
                    "error": "The account number you entered is existed, please enter another account number"
                }
            ),
            401,
        )
    customer_name = data.get("customer_name")
    contact_info = data.get("contact_info")
    customer_type = data.get("customer_type")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    total_amount = 0
    validator.create_account(
        account_no,
        pid,
        customer_name,
        contact_info,
        customer_type,
        start_date,
        end_date,
        total_amount,
    )

    return make_response(jsonify({"success": "New master account has been created"}), 201)

@routes.route("/api/accountManager/summaryReport/", methods=["GET"])
def summary_report():

    validator = ManagerValidator()
    pid = request.args.get("pid")
    account = request.args.get("account")
    if validator.check_new_account(account):
        return make_response(
            jsonify(
                {
                    "error": "This master account does not exist, please enter again"
                }
            ),
            401,
        )
    if not validator.check_account(account, pid):
        return make_response(
            jsonify(
                {
                    "error": "This account does not managed by you, please select another account"
                }
            ),
            401,
        )
    summary = validator.get_summary(account)
    return make_response(jsonify(summary), 200)
        


