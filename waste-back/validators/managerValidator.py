import sqlite3
import re


class ManagerValidator:
    def __init__(self):
        self.connect_db()

    def connect_db(self):
        self.connection = sqlite3.connect("waste.db")
        self.cursor = self.connection.cursor()
        self.cursor.execute("PRAGMA foreign_keys=ON; ")
        self.connection.commit()

    # to check if the account is managed by this account manager
    def check_account(self, account, pid):

        self.cursor.execute(
            "SELECT account_no from accounts where account_mgr=:pid", {"pid": pid}
        )

        result = self.cursor.fetchall()
        accounts = [act[0].lower() for act in result]

        return account.lower() in accounts

    # to check if the account no is already existed
    def check_new_account(self, account):

        self.cursor.execute("SELECT account_no from accounts")
        result = self.cursor.fetchall()
        accounts = [act[0].lower() for act in result]

        return account.lower() not in accounts

    # to check the waste types
    def check_waste(self, waste_type):

        self.cursor.execute("SELECT waste_type from waste_types")
        result = self.cursor.fetchall()
        types = [tp[0].lower() for tp in result]

        return waste_type.lower() in types

    # given a customer type, check if it is valid
    def check_customer_type(self, customer_type):

        customer_types = ["municipal", "commercial", "industrial", "residential"]

        return customer_type.lower() in customer_types

    # given an account no, check if it include characters
    def check_account_no(self, account):

        return account.isdigit()

    # to calculate next available service_no
    def calculate_service_no(self):

        self.cursor.execute("SELECT service_no from service_agreements")
        result = self.cursor.fetchall()
        number_list = [int(number[0]) for number in result]

        return max(number_list) + 1

    # given a price and a master account, update the price to the total amount in the account
    def update_amount(self, master_account, price):

        self.cursor.execute(
            "SELECT total_amount from accounts where account_no=:master_account",
            {"master_account": master_account},
        )
        result = self.cursor.fetchone()
        amount, price = float(result[0]), float(price)
        amount += price

        self.cursor.execute(
            "UPDATE accounts set total_amount=:amount where account_no=:master_account",
            {"amount": amount, "master_account": master_account},
        )

        self.connection.commit()

    def custom_information(self, account):

        self.cursor.execute(
            "select * from accounts where account_no=:account", {"account": account}
        )
        result = self.cursor.fetchone()

        self.cursor.execute(
            "select * from service_agreements where master_account=:account order by service_no",
            {"account": account},
        )
        service_agreements = self.cursor.fetchall()
        service_data = [
            {
                "service_no": service[0],
                "master_account": service[1],
                "location": service[2],
                "waste_type": service[3],
                "pick_up_schedule": service[4],
                "local_contact": service[5],
                "internal_cost": service[6],
                "price": service[7],
            }
            for service in service_agreements
        ]

        return {
            "account_no": result[0],
            "account_mgr": result[1],
            "customer_name": result[2],
            "contact_info": result[3],
            "customer_type": result[4],
            "start_date": result[5],
            "end_date": result[6],
            "total_amount": result[7],
            "service_agreements": service_data,
        }

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

    def get_summary(self, master_account):

        self.cursor.execute("select count(*) from service_agreements where master_account=:master_account",{"master_account":master_account})
        count = self.cursor.fetchone()[0]

        self.cursor.execute("select sum(internal_cost) from service_agreements where master_account=:master_account",{"master_account":master_account})
        cost_sum = self.cursor.fetchone()[0]

        self.cursor.execute("select sum(price) from service_agreements where master_account=:master_account",{"master_account":master_account})
        price_sum = self.cursor.fetchone()[0]

        self.cursor.execute("select count(distinct waste_type) from service_agreements where master_account=:master_account",{"master_account":master_account})
        type_count = self.cursor.fetchone()[0]
        
        return {
            "count" : count,
            "cost_sum" : cost_sum,
            "price_sum" : price_sum,
            "type_count" : type_count
        }

