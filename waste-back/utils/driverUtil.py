import sqlite3
import re


class DriverUtil:
    def __init__(self):
        self.connect_db()

    def connect_db(self):
        self.connection = sqlite3.connect("waste.db")
        self.cursor = self.connection.cursor()
        self.cursor.execute("PRAGMA foreign_keys=ON; ")
        self.connection.commit()

    # given a driver id, return the location
    def get_information(self, service_no):

        self.cursor.execute(
            "select location,waste_type,local_contact from service_agreements where service_no=:service_no",
            {"service_no": service_no},
        )
        location = self.cursor.fetchall()[0]

        return location

    # given a date range, return all the service_no in this range
    def get_service_no(self, start_date, end_date, driver_id):

        command = f"select service_no from service_fulfillments where driver_id=:driver_id and date_time between '{start_date}' and '{end_date}'"
        self.cursor.execute(command, {"driver_id": driver_id})

        result = self.cursor.fetchall()
        service_no = [service[0] for service in result]

        return service_no

    # given a service_no, return the cid_pick_up and cid_drop_off
    def get_container_id(self, service_no, driver_id):

        self.cursor.execute(
            "select cid_pick_up,cid_drop_off from service_fulfillments where service_no=:service_no and driver_id=:driver_id",
            {"service_no": service_no, "driver_id": driver_id},
        )
        cid_pick_up, cid_drop_off = self.cursor.fetchone()

        return cid_pick_up, cid_drop_off

    def get_tour(self, start_date, end_date, driver_id):

        tour = []
        service_no = self.get_service_no(start_date, end_date, driver_id)
        for index, service in enumerate(service_no):
            cid_pick_up, cid_drop_off = self.get_container_id(service, driver_id)
            informations = self.get_information(service)
            data = {
                "location": informations[0],
                "waste_type": informations[1],
                "local_contact": informations[2],
                "cid_pick_up": cid_pick_up,
                "cid_drop_off": cid_drop_off,
                "key" : index
            }
            tour.append(data)
        return tour
