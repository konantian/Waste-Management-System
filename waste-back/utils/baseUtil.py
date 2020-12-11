import sqlite3


class BaseUtil:
    def __init__(self):
        self.connect_db()

    def connect_db(self):
        self.connection = sqlite3.connect("waste.db")
        self.cursor = self.connection.cursor()
        self.cursor.execute("PRAGMA foreign_keys=ON; ")
        self.connection.commit()

    # to check if the account no is already existed
    def check_new_account(self, account):

        self.cursor.execute("SELECT account_no from accounts")
        result = self.cursor.fetchall()
        accounts = [act[0].lower() for act in result]

        return account.lower() not in accounts

    # given a driver number, check if it is in drivers table
    def check_driver(self, driver):

        self.cursor.execute("select pid from drivers")
        result = self.cursor.fetchall()

        drivers_list = [dri[0] for dri in result]

        return driver in drivers_list

    # given a driver pid, check if he own a truck
    def check_own_truck(self, driver_id):

        if not self.check_driver(driver_id):
            return None

        self.cursor.execute(
            "select owned_truck_id from drivers where pid=:driver",
            {"driver": driver_id},
        )
        truck_id = self.cursor.fetchone()[0]

        return truck_id

    # create a new master account
    def create_account(
        self,
        account_no,
        pid,
        customer_name,
        contact_info,
        customer_type,
        start_date,
        end_date,
        total_amount,
    ):

        insert_account = "INSERT INTO accounts VALUES(:account_no,:account_mgr,:customer_name,:contact_info,:customer_type,:start_date,:end_date,:total_amount)"
        self.cursor.execute(
            insert_account,
            {
                "account_no": account_no,
                "account_mgr": pid,
                "customer_name": customer_name,
                "contact_info": contact_info,
                "customer_type": customer_type.lower(),
                "start_date": start_date,
                "end_date": end_date,
                "total_amount": total_amount,
            },
        )
        self.connection.commit()
