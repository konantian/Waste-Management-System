from flask import request, jsonify, make_response
from validators import DriverValidator, DispatcherValidator
from . import routes


@routes.route("/api/driver/trucks/<int:driver_id>", methods=["GET"])
def get_truck_by_id(driver_id):
    validator = DispatcherValidator()
    truck_id = validator.check_own_truck(driver_id)
    return make_response(jsonify({"driver_id": driver_id, "truck_id": truck_id}), 200)


@routes.route("/api/driver/listTour/", methods=["GET"])
def list_tour():

    validator = DriverValidator()
    pid = request.args.get("pid")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    tour_information = validator.get_tour(start_date, end_date, pid)
    return make_response(jsonify(tour_information), 200)
