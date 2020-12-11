import re
from baseUtil import BaseUtil


class ManagerUtil(BaseUtil):
    # get account managed by account mgr
    def get_accounts(self, pid):

        self.cursor.execute(
            "SELECT account_no from accounts where account_mgr=:pid", {"pid": pid}
        )
        result = self.cursor.fetchall()
        accounts = [act[0].lower() for act in result]

        return accounts

    # to check if the account is managed by this account manager
    def check_account(self, account, pid):

        accounts = self.get_accounts(pid)

        return account.lower() in accounts

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

    def customer_information(self, account):

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
                "key": index,
                "master_account": service[1],
                "location": service[2],
                "waste_type": service[3],
                "pick_up_schedule": service[4],
                "local_contact": service[5],
                "internal_cost": service[6],
                "price": round(service[7], 2),
            }
            for index, service in enumerate(service_agreements)
        ]

        return {
            "account_no": result[0],
            "account_mgr": result[1],
            "customer_name": result[2],
            "contact_info": result[3],
            "customer_type": result[4],
            "start_date": result[5],
            "end_date": result[6],
            "total_amount": round(result[7], 2),
            "service_agreements": service_data,
            "key": "customer_imformation",
        }

    def get_summary(self, master_account):

        self.cursor.execute(
            "select count(*) from service_agreements where master_account=:master_account",
            {"master_account": master_account},
        )
        count = self.cursor.fetchone()[0]

        self.cursor.execute(
            "select sum(internal_cost) from service_agreements where master_account=:master_account",
            {"master_account": master_account},
        )
        cost_sum = self.cursor.fetchone()[0]
        cost_sum = 0 if cost_sum == None else cost_sum

        self.cursor.execute(
            "select sum(price) from service_agreements where master_account=:master_account",
            {"master_account": master_account},
        )
        price_sum = self.cursor.fetchone()[0]
        price_sum = 0 if price_sum == None else price_sum

        self.cursor.execute(
            "select count(distinct waste_type) from service_agreements where master_account=:master_account",
            {"master_account": master_account},
        )
        type_count = self.cursor.fetchone()[0]

        return {
            "count": count,
            "cost_sum": round(cost_sum, 2),
            "price_sum": round(price_sum, 2),
            "type_count": type_count,
        }

    def create_agreement(
        self,
        service_no,
        master_account,
        location,
        waste_type,
        pick_up_schedule,
        local_contact,
        internal_cost,
        price,
    ):

        insert_agreement = "INSERT INTO service_agreements VALUES(:service_no,:master_account,:location,:waste_type,:pick_up_schedule,:local_contact,:internal_cost,:price)"
        self.cursor.execute(
            insert_agreement,
            {
                "service_no": service_no,
                "master_account": master_account,
                "location": location,
                "waste_type": waste_type,
                "pick_up_schedule": pick_up_schedule,
                "local_contact": local_contact,
                "internal_cost": internal_cost,
                "price": price,
            },
        )
        self.connection.commit()
