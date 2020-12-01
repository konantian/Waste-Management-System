from flask import request, jsonify, make_response
from validators import DispatcherValidator
from . import routes


@routes.route("/api/dispatcher/container/<string:service_no>", methods=["GET"])
def get_containers_by_agreement(service_no):

    validator = DispatcherValidator()
    account_no = validator.get_master_account(service_no)
    if account_no is None:
        return make_response(jsonify({"containers": []}), 200)
    container_list = validator.get_available_container(account_no)
    return make_response(jsonify({"containers": container_list}), 200)


@routes.route("/api/dispatcher/createEntry/", methods=["POST"])
def create_entry():

    validator = DispatcherValidator()
    data = request.json
    agreement = data.get("agreement")
    if not validator.check_service_no(agreement):
        return make_response(
            jsonify(
                {
                    "error": "The service number entered does not exist,please enter again"
                }
            ),
            400,
        )
    driver_id = data.get("driver_id")
    if not validator.check_driver(driver_id):
        return make_response(
            jsonify(
                {"error": "The driver id entered does not exist,please enter again"}
            ),
            400,
        )
    truck_id = data.get("truck_id")
    owned_truck = validator.check_own_truck(driver_id)
    if owned_truck is None and not validator.check_truck(truck_id):
        return make_response(
            jsonify(
                {"error": "The truck endtered owned by other drivers, please enter again"}
            ),
            400,
        )

    cid_drop_off = data.get("cid_drop_off")
    date_time = data.get("date_time")
    validator.create_entry(date_time, agreement, truck_id, driver_id, cid_drop_off)
    return make_response(jsonify({"success": "New entry has been created"}), 201)
