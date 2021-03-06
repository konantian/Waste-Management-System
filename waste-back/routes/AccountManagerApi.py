from flask import request, jsonify, make_response
from utils import ManagerUtil
from . import routes


@routes.route("/api/accountManager/listInformation", methods=["GET"])
def list_information():

    util = ManagerUtil()
    pid = request.args.get("pid")
    account = request.args.get("account")
    if not util.check_account(account, pid):
        return make_response(
            jsonify(
                {
                    "error": "The master account you entered does not exist or you have no access right on that account "
                }
            ),
            400,
        )
    customer_data = util.customer_information(account)
    return make_response(jsonify(customer_data), 200)


@routes.route("/api/accountManager/createAccount", methods=["POST"])
def create_master_account():

    util = ManagerUtil()
    data = request.json
    pid = data.get("pid")
    account_no = data.get("account_no")
    if not util.check_new_account(account_no):
        return make_response(
            jsonify(
                {
                    "error": "The account number you entered is existed, please enter another account number"
                }
            ),
            400,
        )
    customer_name = data.get("customer_name")
    contact_info = data.get("contact_info")
    customer_type = data.get("customer_type")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    total_amount = 0
    util.create_account(
        account_no,
        pid,
        customer_name,
        contact_info,
        customer_type,
        start_date,
        end_date,
        total_amount,
    )

    return make_response(
        jsonify({"success": "New master account has been created"}), 201
    )


@routes.route("/api/accountManager/createAgreement", methods=["POST"])
def create_service_agreement():

    util = ManagerUtil()
    data = request.json
    service_no = util.calculate_service_no()
    pid = data.get("pid")
    account_no = data.get("account_no")
    if util.check_new_account(account_no):
        return make_response(
            jsonify(
                {"error": "This master account does not exist, please enter again"}
            ),
            400,
        )
    if not util.check_account(account_no, pid):
        return make_response(
            jsonify(
                {
                    "error": "This account does not managed by you, please select another account"
                }
            ),
            401,
        )
    location = data.get("location")
    waste_type = data.get("waste_type")
    pick_up_schedule = data.get("pick_up_schedule")
    local_contact = data.get("local_contact")
    internal_cost = data.get("internal_cost")
    price = data.get("price")

    util.update_amount(account_no, price)
    util.create_agreement(
        service_no,
        account_no,
        location,
        waste_type,
        pick_up_schedule,
        local_contact,
        internal_cost,
        price,
    )

    return make_response(
        jsonify({"success": "New service agreement has been created"}), 201
    )


@routes.route("/api/accountManager/summaryReport", methods=["GET"])
def summary_report():

    util = ManagerUtil()
    pid = request.args.get("pid")
    account = request.args.get("account")
    if util.check_new_account(account):
        return make_response(
            jsonify(
                {"error": "This master account does not exist, please enter again"}
            ),
            400,
        )
    if not util.check_account(account, pid):
        return make_response(
            jsonify(
                {
                    "error": "This account does not managed by you, please select another account"
                }
            ),
            401,
        )
    summary = util.get_summary(account)
    return make_response(jsonify(summary), 200)


@routes.route("/api/accountManager/accounts/<string:account_mgr>", methods=["GET"])
def get_accounts_by_mgr(account_mgr):

    util = ManagerUtil()
    accounts = util.get_accounts(account_mgr)
    return make_response(jsonify({"accounts": accounts}), 200)
