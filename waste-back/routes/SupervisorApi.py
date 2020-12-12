from flask import request, jsonify, make_response
from utils import SupervisorUtil
from . import routes


@routes.route("/api/supervisor/assignAccount/", methods=["POST"])
def assign_account():
    util = SupervisorUtil()
    data = request.json
    pid = data.get("pid")
    manager = data.get("manager")
    if not util.check_manager(pid, manager):
        return make_response(
            jsonify({"error": "This account does not managed by you!"}),
            401,
        )
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
        manager,
        customer_name,
        contact_info,
        customer_type,
        start_date,
        end_date,
        total_amount,
    )
    return make_response(jsonify({"success": "New account has been assigned"}), 201)


@routes.route("/api/supervisor/customerList/", methods=["GET"])
def customer_list():
    util = SupervisorUtil()
    pid = request.args.get("pid")
    customers = util.list_customers(pid)
    return make_response(jsonify({"customers": customers}), 200)


@routes.route("/api/supervisor/customerReport", methods=["GET"])
def customer_report():
    util = SupervisorUtil()
    master_account = request.args.get("account")
    manager = util.get_manager(master_account)
    service_count, price_sum, cost_sum, type_count = util.get_customer_report(
        master_account
    )
    data = {
        "manager_id": manager["id"],
        "manager_name": manager["name"],
        "service_count": service_count,
        "price_sum": round(price_sum, 2),
        "cost_sum": round(cost_sum, 2),
        "type_count": type_count,
    }
    return make_response(jsonify(data), 200)


@routes.route("/api/supervisor/managerReport", methods=["GET"])
def manager_report():
    util = SupervisorUtil()
    pid = request.args.get("pid")
    managers = util.get_managers(pid)
    sort_managers = util.sort_report(managers)
    data = []
    for index, mgr in enumerate(sort_managers):
        manager_name = util.get_manager_name_by_id(mgr)
        master_count, agreements_count = util.get_count(mgr)
        price_sum = util.get_price_sum(mgr)
        cost_sum = util.get_cost_sum(mgr)
        data.append(
            {
                "manager_name": manager_name,
                "master_count": master_count,
                "service_count": agreements_count,
                "price_sum": round(price_sum, 2),
                "cost_sum": round(cost_sum, 2),
                "key": index,
            }
        )
    return make_response(jsonify(data), 200)
