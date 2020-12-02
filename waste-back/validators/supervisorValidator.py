import sqlite3
import re


class SupervisorValidator:
    def __init__(self):
        self.connect_db()

    def connect_db(self):
        self.connection = sqlite3.connect("waste.db")
        self.cursor = self.connection.cursor()
        self.cursor.execute("PRAGMA foreign_keys=ON; ")
        self.connection.commit()

    # to check if this supervisor supervise this account,manager
    def check_manager(self, pid, manager):

        self.cursor.execute(
            "select pid from personnel where supervisor_pid=:pid", {"pid": pid}
        )
        result = self.cursor.fetchall()

        pid_list = [pd[0] for pd in result]

        return manager in pid_list

    # to check if this customer managed by an account manager who supervised by this supervisor
    def check_customer(self, supervisor_id, master_account):

        self.cursor.execute(
            "select account_mgr from accounts where account_no=:master_account",
            {"master_account": master_account},
        )

        result = self.cursor.fetchone()

        account_mgr = result[0]

        return self.check_manager(supervisor_id, account_mgr)

    #given a account manager, return it's name
    def get_manager_name_by_id(self,account_mgr):

        self.cursor.execute(
            "select name from personnel where pid=:account_mgr",
            {"account_mgr": account_mgr},
        )
        name = self.cursor.fetchone()[0]
        return name

    # given a master account, get the account_manager name
    def get_manager_name(self, master_account):

        self.cursor.execute(
            "select account_mgr from accounts where account_no=:master_account",
            {"master_account": master_account},
        )
        result = self.cursor.fetchone()
        account_mgr = result[0]

        return self.get_manager_name_by_id(account_mgr)

    # given a supervisor_id, get the account managers
    def get_managers(self, pid):

        self.cursor.execute(
            "select pid from personnel where supervisor_pid=:pid", {"pid": pid}
        )
        result = self.cursor.fetchall()

        manager_list = [mgr[0] for mgr in result]

        return manager_list

    # list all the customers that can be choose
    def list_customers(self, pid):

        self.cursor.execute(
            "select account_no from accounts where account_mgr in (select pid from personnel where supervisor_pid=:pid)",
            {"pid": pid},
        )
        result = self.cursor.fetchall()

        customers = [cus[0] for cus in result]

        return customers

    # given a account manager, return the master count and service agreements count
    def get_count(self, account_mgr):

        self.cursor.execute(
            "select count(*) from service_agreements where master_account in (select account_no from accounts where account_mgr=:account_mgr)",
            {"account_mgr": account_mgr},
        )
        result = self.cursor.fetchone()
        agreements_count = result[0]

        self.cursor.execute(
            "select count(*) from accounts where account_mgr=:account_mgr",
            {"account_mgr": account_mgr},
        )
        result_two = self.cursor.fetchone()
        master_count = result_two[0]

        return master_count, agreements_count

    #given a manager, return price sum for all the account it manages
    def get_price_sum(self, account_mgr):
        self.cursor.execute(
                "select sum(price) from service_agreements where master_account in (select account_no from accounts where account_mgr=:account_mgr)",
                {"account_mgr": account_mgr},
        )
        price_sum = self.cursor.fetchone()[0]
        return price_sum
        

    #give n a manager, return cost sum for all the account it manages
    def get_cost_sum(self, account_mgr):
        self.cursor.execute(
                "select sum(internal_cost) from service_agreements where master_account in (select account_no from accounts where account_mgr=:account_mgr)",
                {"account_mgr": account_mgr},
        )
        cost_sum = self.cursor.fetchone()[0]
        return cost_sum


    # sort the summary report by the different of the sum of the internal cost and sum of the price
    def sort_report(self, managers):

        manager_dict = {}
        for account_mgr in managers:
            price_sum = self.get_price_sum(account_mgr)
            cost_sum = self.get_cost_sum(account_mgr)
            difference = abs(price_sum - cost_sum)
            manager_dict[account_mgr] = difference

        return sorted(manager_dict.keys(), key=lambda x: manager_dict.get(x))

    def assign_account(
        self,
        account_no,
        manager,
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
                "account_mgr": manager,
                "customer_name": customer_name,
                "contact_info": contact_info,
                "customer_type": customer_type.lower(),
                "start_date": start_date,
                "end_date": end_date,
                "total_amount": total_amount,
            },
        )

        self.connection.commit()

    def get_customer_report(self, master_account):
        self.cursor.execute("select count(*) from service_agreements where master_account=:master_account",{"master_account":master_account})
        service_count = self.cursor.fetchone()[0]

        self.cursor.execute("select sum(internal_cost) from service_agreements where master_account=:master_account",{"master_account":master_account})
        cost_sum = self.cursor.fetchone()[0]

        self.cursor.execute("select sum(price) from service_agreements where master_account=:master_account",{"master_account":master_account})
        price_sum = self.cursor.fetchone()[0]

        self.cursor.execute("select count(distinct waste_type) from service_agreements where master_account=:master_account",{"master_account":master_account})
        type_count = self.cursor.fetchone()[0]

        return service_count,cost_sum,price_sum,type_count
