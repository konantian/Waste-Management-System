from flask import request, jsonify, make_response
from validators import DispatcherValidator
from . import routes


@routes.route("/api/dispathcer/container/<int:account_no>", methods=["GET"])
def get_containers_by_account(account_no):

    validator = DispatcherValidator()
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
            401,
        )
    driver_id = data.get("driver_id")
    if not validator.check_driver(driver_id):
        return make_response(
            jsonify(
                {"error": "The driver id entered does not exist,please enter again"}
            ),
            401,
        )
    truck_id = data.get("truck_id")
    if not validator.check_truck(truck_id):
        return make_response(
            jsonify(
                {"error": "The truck id entered are not available, please enter again"}
            ),
            401,
        )

    cid_drop_off = data.get("cid_drop_off")
    date_time = data.get("date_time")
    validator.create_entry(date_time, agreement, truck_id, driver_id, cid_drop_off)
    return make_response(jsonify({"success": "New entry has been created"}), 201)
