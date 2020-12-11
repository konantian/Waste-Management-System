from flask import request, jsonify, make_response
from utils import DispatcherUtil
from . import routes


@routes.route("/api/dispatcher/container/<string:service_no>", methods=["GET"])
def get_containers_by_agreement(service_no):

    util = DispatcherUtil()
    account_no = util.get_master_account(service_no)
    if account_no is None:
        return make_response(
            jsonify({"error": "This agreement does not exist!"}),
            400,
        )
    container_list = util.get_available_container(account_no)
    if not container_list:
        return make_response(
            jsonify({"error": "There are no available containers for this agreement"}),
            400,
        )
    return make_response(jsonify({"containers": container_list}), 200)


@routes.route("/api/dispatcher/createEntry", methods=["POST"])
def create_entry():

    util = DispatcherUtil()
    data = request.json
    agreement = data.get("agreement")
    driver_id = data.get("driver_id")
    truck_id = data.get("truck_id")
    owned_truck = util.check_own_truck(driver_id)
    if owned_truck is None and not util.check_truck(truck_id):
        return make_response(
            jsonify({"error": "The truck entered is not available,please enter again"}),
            400,
        )

    cid_drop_off = data.get("cid_drop_off")
    date_time = data.get("date_time")
    util.create_entry(date_time, agreement, truck_id, driver_id, cid_drop_off)
    return make_response(jsonify({"success": "New entry has been created"}), 201)
