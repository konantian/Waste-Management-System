from flask import request, jsonify, make_response
from validators import DispatcherValidator
from . import routes


@routes.route("/api/dispatcher/createEntry/", methods=["POST"])
def create_entry():

    validator = DispatcherValidator()
    data = request.json
    agreement = data.get('agreement')
    if not validator.check_service_no(agreement):
        return make_response(
            jsonify(
                {
                    "error": "The service number entered does not exist,please enter again"
                }
            ),
            401,
        )
    driver_id = data.get('driver_id')
    if not validator.check_driver(driver_id):
         return make_response(
            jsonify(
                {
                    "error": "The driver number entered does not exist,please enter again"
                }
            ),
            401,
        )
    truck_id = validator.check_own_truck(driver_id)
    if truck_id is None:
        truck_id = data.get('truck_id')
        if not validator.check_truck(truck_id):
            return make_response(
            jsonify(
                {
                    "error": "The truck id entered are not available, please enter again"
                }
            ),
            401,
        )

    master_account = validator.get_master_account(agreement)
    cid_pick_up = validator.get_pick_up(master_account)
    container_list = validator.get_available_container(master_account)
    if len(container_list) == 0:
         return make_response(
            jsonify(
                {
                    "error": "There are no available containers to drop off, please select another agreement"
                }
            ),
            401,
        )
    else:
        cid_drop_off = data.get('cid_drop_off')
        if cid_drop_off not in container_list:
            return make_response(
                jsonify(
                    {
                        "error": "The cid entered are currently not available, please enter another one"
                    }
                ),
                401,
            )
        date_time = data.get('date_time')

