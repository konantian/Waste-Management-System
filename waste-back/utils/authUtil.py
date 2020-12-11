import re
from baseUtil import BaseUtil
from werkzeug.security import generate_password_hash, check_password_hash


class AuthUtil(BaseUtil):
    # check if the pid is in the database
    def check_pid(self, pid):
        self.cursor.execute("select pid from personnel")
        result = self.cursor.fetchall()
        pid_list = [p_id[0] for p_id in result]
        return pid in pid_list

    # given a user_id,check if it is already in the user table
    def check_exist_pid(self, user_id):

        self.cursor.execute("SELECT user_id from users")
        result = self.cursor.fetchall()
        user_ids = [user_id[0] for user_id in result]
        return user_id in user_ids

    # check if the user_id entered is matched with the role entered
    def check_role(self, user_id, role):
        self.cursor.execute("select pid from account_managers")
        result = self.cursor.fetchall()
        manager_list = [manager[0] for manager in result]

        self.cursor.execute("select pid from drivers")
        result = self.cursor.fetchall()
        driver_list = [driver[0] for driver in result]

        self.cursor.execute(
            "select supervisor_pid from personnel",
            {"user_id": user_id},
        )
        result = self.cursor.fetchall()
        supervisor_list = [supervisor[0] for supervisor in result]

        if (
            user_id in manager_list
            and re.match(role, "account manager", re.IGNORECASE) != None
        ):
            return True

        elif user_id in driver_list and re.match(role, "driver", re.IGNORECASE) != None:
            return True

        elif (
            user_id in supervisor_list
            and re.match(role, "supervisor", re.IGNORECASE) != None
        ):
            return True

        elif re.match(role, "dispatcher", re.IGNORECASE) != None:
            return True

        return False

    # check if the username has already existed
    def check_username(self, username):

        self.cursor.execute("select login from users;")
        result = self.cursor.fetchall()
        username_list = [un[0].lower() for un in result]
        return username.lower() in username_list

    def check_password(self, username, password):

        self.cursor.execute(
            "select password from users where login=:username", {"username": username}
        )
        hash_pwd = self.cursor.fetchone()[0]
        return check_password_hash(hash_pwd, password)

    def getRole(self, username):

        self.cursor.execute(
            "select role from users where login=:username", {"username": username}
        )
        role = self.cursor.fetchone()[0]
        return role

    def getUserId(self, username):

        self.cursor.execute(
            "select user_id from users where login=:username", {"username": username}
        )
        userId = self.cursor.fetchone()[0]
        return userId

    def getName(self, pid):

        self.cursor.execute("select name from personnel where pid=:pid", {"pid": pid})
        name = self.cursor.fetchone()[0]
        return name

    def register(self, userId, role, login, password):

        hash_pwd = generate_password_hash(password)
        insert_user = "INSERT INTO users VALUES(:user_id,:role,:login,:password)"
        self.cursor.execute(
            insert_user,
            {
                "user_id": userId,
                "role": role.lower(),
                "login": login.lower(),
                "password": hash_pwd,
            },
        )
        self.connection.commit()
        return True
