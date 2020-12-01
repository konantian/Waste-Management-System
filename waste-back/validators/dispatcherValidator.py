import sqlite3
import re


class DispatcherValidator:
    def __init__(self):
        self.connect_db()

    def connect_db(self):
        self.connection = sqlite3.connect("waste.db")
        self.cursor = self.connection.cursor()
        self.cursor.execute("PRAGMA foreign_keys=ON; ")
        self.connection.commit()

    # given a service number, check if it is in service_agreements table
    def check_service_no(self, agreement):

        self.cursor.execute("select service_no from service_agreements")
        result = self.cursor.fetchall()

        agreement_list = [agm[0] for agm in result]

        return agreement in agreement_list

    # given a driver number, check if it is in drivers table
    def check_driver(self, driver):

        self.cursor.execute("select pid from drivers")
        result = self.cursor.fetchall()

        drivers_list = [dri[0] for dri in result]

        return driver in drivers_list

    # given a driver pid, check if he own a truck
    def check_own_truck(self, driver):

        self.cursor.execute(
            "select owned_truck_id from drivers where pid=:driver", {"driver": driver}
        )
        truck_id = self.cursor.fetchone()[0]

        return truck_id

    # given an truck id, check if it is in trucks table:
    def check_truck(self, truck):
        self.cursor.execute(
            "select truck_id from trucks where truck_id not in (select owned_truck_id from drivers where owned_truck_id is not NULL)"
        )
        result = self.cursor.fetchall()

        trucks = [trk[0] for trk in result]

        return truck in trucks

    # given a service_no, get the master account
    def get_master_account(self, service_no):

        self.cursor.execute(
            "select master_account from service_agreements where service_no=:service_no",
            {"service_no": service_no},
        )
        account = self.cursor.fetchone()[0]

        return account

    # given a master account, return the container that he should pick up next time
    def get_pick_up(self, master_account):

        self.cursor.execute(
            "select cid_drop_off from service_fulfillments where master_account=:master_account order by date_time desc limit 1",
            {"master_account": master_account},
        )
        result = self.cursor.fetchone()

        return result[0] if result != None else "0000"

    # given a master account, return all the available list
    def get_waste_type(self, master_account):

        self.cursor.execute(
            "select waste_type from service_agreements where master_account=:master_account",
            {"master_account": master_account},
        )
        result = self.cursor.fetchall()

        containers = [ct[0] for ct in result]

        return containers

    # given a list of waste type, return the containers that has the same type with it
    def get_available_container(self, master_account):

        waste_type = self.get_waste_type(master_account)

        self.cursor.execute(
            "SELECT c.container_id FROM containers c WHERE NOT EXISTS (SELECT * FROM service_fulfillments s WHERE s.cid_drop_off = c.container_id) UNION SELECT c.container_id FROM containers c WHERE (SELECT MAX(date_time) FROM service_fulfillments s WHERE s.cid_pick_up = c.container_id) > (SELECT MAX(date_time) FROM service_fulfillments s WHERE s.cid_drop_off = c.container_id)"
        )
        result = self.cursor.fetchall()
        cid_list = [cid[0] for cid in result]
        cids = []
        for wt in waste_type:
            self.cursor.execute(
                "select container_id from container_waste_types where waste_type=:waste_type",
                {"waste_type": wt},
            )
            cid_result = self.cursor.fetchall()
            for cid in cid_result:
                cids.append(cid[0])

        container = [cid for cid in cids if cid in cid_list]

        return list(set(container))

    def create_entry(
        self,
        date_time,
        agreement,
        truck_id,
        driver_id,
        cid_drop_off,
    ):

        master_account = self.get_master_account(agreement)
        cid_pick_up = self.get_pick_up(master_account)

        insert_fulfillments = "INSERT INTO service_fulfillments VALUES(:date_time,:master_account,:service_no,:truck_id,:driver_id,:cid_drop_off,:cid_pick_up)"
        self.cursor.execute(
            insert_fulfillments,
            {
                "date_time": date_time,
                "master_account": master_account,
                "service_no": agreement,
                "truck_id": truck_id,
                "driver_id": driver_id,
                "cid_drop_off": cid_drop_off,
                "cid_pick_up": cid_pick_up,
            },
        )
