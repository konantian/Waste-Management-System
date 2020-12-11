from flask import request, jsonify, make_response
from utils import DriverUtil, DispatcherUtil
from . import routes

@routes.route("/api/driver/trucks/<string:driver_id>", methods=["GET"])
def get_truck_by_driver_id(driver_id):
    util = DispatcherUtil()
    if not util.check_driver(driver_id):
        return make_response(
            jsonify(
                {"error": "This driver id does not exist!"}
            ),
            400,
        )
    truck_id = util.check_own_truck(driver_id)
    return make_response(jsonify({"driver_id": driver_id, "truck_id": truck_id}), 200)


@routes.route("/api/driver/listTour/", methods=["GET"])
def list_tour():

    util = DriverUtil()
    pid = request.args.get("pid")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    tour_information = util.get_tour(start_date, end_date, pid)
    return make_response(jsonify(tour_information), 200)
