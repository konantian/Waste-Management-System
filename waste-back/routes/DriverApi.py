from flask import request, jsonify, make_response
from validators import DriverValidator
from . import routes

@routes.route("/api/driver/listTour/", methods=["GET"])
def list_tour():

    validator = DriverValidator()
    pid = request.args.get("pid")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    tour_information = validator.get_tour(start_date, end_date, pid)
    return make_response(jsonify(tour_information), 200)
