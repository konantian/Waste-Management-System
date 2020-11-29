# Waste-Management-System
### This repo used for refactoring the mini project 1 from CMPUT291 

#### Clarifications and updates:

The main text below always reflects the latest version, which includes possible updates and clarifications, posted via the Course Forums. You are responsible for monitoring the course news and discussion forums in eClass for more details and clarifications. No clarification will be posted after 5pm on March 13.


#### Introduction

The goal of this assignment is for you to study and practice the use of SQL in a host programming language and demonstrate some of the functionalities that result from combining SQL with a host programming language.

Your job in this project is to build a system that keeps the enterprise data in a database and to provide services to users. You will be storing data in a SQLite database (called waste_management.db), and you will be writing code in Python (Version 3) using the sqlite3 Python module to access it. Your code should implement a simple command line interface, but you are free to implement a GUI interface instead (however, there will be no support or bonus marks for a GUI interface). 

Your project will be evaluated in the following way: 80% of the marks will be given for providing the functionalities listed in the specifications below; this component will be assessed in a demo session. Another 15% of the marks will be given for the documentation and quality of your source code and for your design document. The last 5% of the marks will be given for the quality of your group coordination and the (fair and even) distribution of work between group members.

#### Group work policy

You must do this project with one or two group partners from the 291 class. Register your group at the group registration page, as soon as possible! Anyone not registered in a group by March 5th, will be assigned by us to a group. 

It is assumed that all group members contribute approximately equally to the project; hence, they will receive the same mark. In case of difficulties within groups, and when a partner is not lifting his/her weight, make sure to document all your contributions. If there is a break-up, each group member will get credit only for his/her portion of the completed work (losing the mark for any work either not completed or completed by group partners). For that reason, breaking up a group in case of a conflict should be your last resort.


#### Database Specification

You are given the following relational schema (which is similar to the schema for Assignment 2, and which is based on the application description in Assignment 1).

**users (user_id, role, login, password)**
Information about the users of the system: user_id is a unique identifier that corresponds to a personnel id, role is one of the roles described below (account manager, supervisor, dispatcher, or driver), login is the username used to log into the system, and password stores an "encrypted" password.

**trucks (truck_id, model, truck_type)**
Information about trucks: truck_id is a unique identifier, model describes the make and model of the vehicle, and truck_type should be one of "front loader", "roll-off", or "garbage bin collector" in your data).

**maintenance_records (truck_id, service_date, description)**
Information about the maintenance of trucks: truck_id is the id of a truck, service_date is the date when the maintenance was performed on the truck, and Description should be one of "Inspection" or "Repair" (with possible detail if you want) in your data.

**containers (container_id, container_type, date_when_built)**
Information about garbage containers: container_id is a unique identifier, date_when_built is the date when the container was manufactured, and container_type should be one of "Auger Compactor", "Hydraulic Compactor", "Roll-Off dumpster", "Open-Topped", and "Closed-Topped" in your data.

**waste_types (waste_type)**
A list of waste types containers containers can hold and that customers can request. In your data you should have "hazardous waste", "plastic", "metal", "paper",  "compost", "construction waste", and "mixed waste".

**container_waste_types (container_id, waste_type)**
Information about what types of waste each container can hold. Containers can hold multiple types of waste, leading to multiple entries in this table in your data. container_id is the id of a container and waste_type is one of the waste types that must occur in the waste_types table.

**personnel (pid, name, email, address, supervisor_pid)**
Information about personnel. Attributes are self-explanatory.
account_managers (pid, manager_title, office_location)
Information about the subset of personnel who are account managers: manager_title should be one of "major accounts manager", "medium accounts manager", or "small accounts manager" in your data. 

**drivers (pid, certification, owned_truck_id)**
Information about the subset of personnel who are drivers: owned_truck_id is the truck_id of the truck that the driver owns, in case he/she owns a truck; otherwise this field is NULL; the driving certification should be one of "Single Trailer", "Doubles/Triples", "Tanker", and "HAZMAT" in your data.

**accounts (account_no, account_mgr, customer_name, contact_info, customer_type, start_date, end_date, total_amount)**
Information about accounts: account_no is the unique ID of a master agreement with a customer, total_amount is the total dollar amount of all services that this customer has with the company, and customer_type should be one of "municipal", "commercial", "industrial", or "residential" in your data. 

**service_agreements (service_no, master_account, location, waste_type, pick_up_schedule, local_contact, internal_cost, price)**
Information about the individual services of a customer: service_no is just a running number, starting at 1 for each customer/account, master_account is the master account ID referring to the accounts table, location is an address (where a specific container is to be deployed), waste_type is one of the waste types that must occur in the waste_types table, pick_up_schedule is a description of  a pick-up schedule (e.g.: "every Monday of every week" or "on the first Wednesday of each month"), local_contact is the phone number of a person at the location, internal_cost is an estimate of what it costs the waste management company to provide this service, and price is the price for that the customer has to pay for this service.

**service_fulfillments (date_time, master_account, service_no, truck_id, driver_id, cid_drop_off, cid_pick_up)**
Information about when and how services are fulfilled: data_time is the date and time when the full container with ID cid_pick_up is picked up and the empty container with ID cid_drop_off is dropped off at the customer location corresponding to (master_account, service_no) - by a driver with ID driver_id using a truck with ID truck_id.
The SQL commands to create the tables of the system are given to you, and you must not change any table/column names since we will be testing your project with the given schema.

The system has four classes of users who use the system in different ways:

* Account managers use the system to query and update information about the accounts they manage.
* Supervisors use the system to query information about the accounts of account managers they supervise.
Dispatchers use the system to create schedules.
* Drivers use the system to find out about their own schedule.
All searches performed by users must be case-insensitive even though the data stored in tables could be in both uppercase and lowercase. You can assume that all IDs are stored as strings but they do represent an integer value, so that it is safe to cast it to an int in Python (for instance, if you want to find the largest ID and increment it to obtain the next ID).



#### System Functionalities

**Login Screen**

All users have to authenticate to the system using a login and a password (which should not be stored in plain text, but should be a hashed key). After authentication, your system will present a user with choices depending on their user role (indicated in the users table). A main choice common to all users is the ability to logout from the system; the other choices, which depend on the role, are described in the following.

**Derived keys from Passwords**

To simplify and speed-up the demo process for the mini-projects, I have decided that you must all use the same hash generation mechanism using Python's hashlib module for the "encryption" of the user passwords.

Use the following lines of Python code to generate byte objects that you can store as passwords in the users table:

First import the pbkdf2_hmac function from the hashlib module
```python
from hashlib import pbkdf2_hmac
```

the user's password will be different for different users, e.g.:
```python
password = 'MyStupidPassword'
```

the following three identifiers are arguments to pbkdf2_hmac that must not be changed!
```python
hash_name = 'sha256'
salt = 'ssdirf993lksiqb4'
iterations = 100000
```
Call pbkdf2_hmac to generate a derived key from the string password bound to the identifier(variable) pwd. If you use an identifier for user passwords, other than pwd, you must change

pwd accordingly in the following function call.
Do not change any of the other parameters of this function call!
```python
dk = pbkdf2_hmac(hash_name, bytearray(password, 'ascii'), bytearray(salt, 'ascii'), iterations)
```

After this function call, dk will be bound to a derived key, which is a byte object, that you can store in the user table as password for a user. You can then compare this value against the derived key that is generated from the string that a user types in as password when trying to log into your system. For instance, if the entered password is bound to the identifier entered_pwd, you can get a derived key for entered_pwd in the same way via:

```python
dk2 = pbkdf2_hmac(hash_name, bytearray(entered_pwd, 'ascii'), bytearray(salt, 'ascii'), iterations)
```

This derived key dk2 will be the same as dk above, if entered_pwd is the same as pwd. 

See [hashlib](https://docs.python.org/3/library/hashlib.html) for documentation.

Do not implement your own encryption scheme, use a different method, or use different parameters for the pbkdf2_hmac function (other than different values for the string that represents a password)! 


**Account Managers**

Account managers must be able to perform all of the following tasks:

Select a customer (master account), and then list all the information associated with this customer, followed by the list of all the individual service agreements under for this customer, ordered by service_no. An account manager should only be able to access the accounts that he or she manages.
Create a new master account with all the required information. The manager of the account should be automatically set to the id of the account manager who is creating the account.
For a given customer, add a new service agreement with all the required information -except for the master account number, and the service_no, which should be automatically filled in by the system; master_account is the number of the selected customer, and the service_no is a running numbers, so the next available number should be filled in. If a new service agreement is added, the total amount for the customer should be updated as well. For simplicity, you can add the price for the added service agreement to the total amount in the accounts table.
Create a summary report for a single customer, listing the total number of service agreements, the sum of the prices and the sum of the internal cost of the service agreements, as well as the number of different waste types that occur in the service agreements.

**Supervisors**

Supervisors must be able to perform all of the following tasks:

Same as option 2 for the account managers, but with the difference that the supervisor should be able to assign the account manager for the account by selecting one of his/her account managers before creating the account.
Same as option 4 for the account managers, but with the following differences: 1) the supervisor should be able to select a customer from the customers of all account managers that the supervisor supervises; 2) the report should also include the name of the account manager who manages the account.
Create a summary report that contains the following summary information for each of the account managers that the supervisor supervises: the total number of master agreements for an account manager, the total number of service agreements, the sum of the prices and the sum of the internal cost of all service agreements for the account manager. The report should be sorted by the difference between the sum of prices and the sum of internal costs.

**Dispatchers**

Dispatchers must be able to perform the following task:

Create entries in the table service_fulfillments for upcoming days (which will act as a schedule so that drivers will be able to obtain the information about which tours they have to drive). The dispatcher must be able to first select a service agreement. Then, he or she should be given options to select driver, truck, and a container to be dropped off and picked up with the following constraints:

If a driver is selected who owns a truck, that truck should be automatically selected; otherwise the dispatcher also must select a truck.
The information about the container to be picked up must be filled in automatically; the dispatcher should not have to select this container. If there is already a container at the location for the selected service agreement, that is the container to be picked up (the last record where a container was dropped off at that location will have the information about the container). If there is no container yet at the location of the service agreement, the "Dummy Container” (container ID = '0000') should be picked up.
The dispatcher should select the container to be dropped off from a list of available containers; this list should only show available containers that can hold the appropriate waste type, given in the service agreement. A container is available, if it is not currently located at a customer's service agreement location and not already scheduled to be dropped off at a future date. 
For the date_time entry it is sufficient to just enter a date string in the form ' YYYY-MM-DD' (i.e., not including time information).

**Drivers**

Drivers must be able to perform the following task:

For a given date range, list all the tours that they have been assigned to. The information about a tour consists of the the following:

The location where to exchange containers.
The local contact information for the service agreement.
The waste_type involved in the service agreement.
The container ID of the container to be dropped off.
The container ID of the container to be picked up.
Other

In addition, you need to provide a mechanism for adding users with login, role, and password.

========================

### -- CMPUT 291 - Winter 2018 
**TABLES for Project #1, assuming SQLite as database engine (uses the TEXT data type)**

**The following commands drops the tables in case they exist from earlier runs.**
```sql
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS service_fulfillments;
DROP TABLE IF EXISTS service_agreements;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS account_managers;
DROP TABLE IF EXISTS personnel;
DROP TABLE IF EXISTS container_waste_types;
DROP TABLE IF EXISTS waste_types;
DROP TABLE IF EXISTS containers;
DROP TABLE IF EXISTS maintenance_records;
DROP TABLE IF EXISTS trucks;
```

**The following commands create the tables including FOREIGN KEY constraints**
```sql
CREATE TABLE users (
  user_id	TEXT, 
  role		TEXT,
  login		TEXT, 
  password	TEXT, 
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES personnel(pid) ON DELETE CASCADE
);


CREATE TABLE trucks (
  truck_id          TEXT,
  model             TEXT,
  truck_type        TEXT,
  PRIMARY KEY (truck_id) 
);

CREATE TABLE maintenance_records (
  truck_id          TEXT,
  service_date      DATE,
  description       TEXT,
  PRIMARY KEY (truck_id, service_date),
  FOREIGN KEY (truck_id) REFERENCES trucks ON DELETE CASCADE
);

CREATE TABLE containers (
  container_id      TEXT,
  container_type    TEXT,
  date_when_built   DATE,
  PRIMARY KEY (container_id)
);

CREATE TABLE waste_types (
    waste_type      TEXT,
    PRIMARY KEY (waste_type)
);

CREATE TABLE container_waste_types (
  container_id      TEXT,
  waste_type        TEXT,
  PRIMARY KEY (container_id, waste_type),
  FOREIGN KEY (container_id) REFERENCES containers,
  FOREIGN KEY (waste_type) REFERENCES waste_types
);

CREATE TABLE personnel (
  pid               TEXT, 
  name              TEXT, 
  email             TEXT, 
  address           TEXT, 
  supervisor_pid    TEXT, 
  PRIMARY KEY (PID)
);

CREATE TABLE account_managers (
  pid               TEXT,
  manager_title     TEXT,
  office_location   TEXT,
  PRIMARY KEY (pid),
  FOREIGN KEY (pid) REFERENCES personnel
);

CREATE TABLE drivers (
  pid               TEXT,
  certification     TEXT,
  owned_truck_id    TEXT,
  PRIMARY KEY (pid),
  FOREIGN KEY (pid) REFERENCES personnel,
  FOREIGN KEY (owned_truck_id) REFERENCES trucks(truck_id)
);

CREATE TABLE accounts (
  account_no        TEXT,
  account_mgr       TEXT,
  customer_name     TEXT,
  contact_info      TEXT,
  customer_type     TEXT,
  start_date        DATE,
  end_date          DATE,
  total_amount      REAL,
  PRIMARY KEY (account_no),
  FOREIGN KEY (account_mgr) REFERENCES account_managers(pid)
);

CREATE TABLE service_agreements (
  service_no        TEXT,
  master_account    TEXT,
  location          TEXT,
  waste_type        TEXT,
  pick_up_schedule  TEXT,
  local_contact     TEXT,
  internal_cost     REAL,
  price             REAL,
  PRIMARY KEY (master_account, service_no),
  FOREIGN KEY (master_account) REFERENCES accounts ON DELETE CASCADE, 
  FOREIGN KEY (waste_type) REFERENCES waste_types
); 
  
CREATE TABLE service_fulfillments (
  date_time         DATE,
  master_account    TEXT, 
  service_no        TEXT,
  truck_id          TEXT,
  driver_id         TEXT,
  cid_drop_off      TEXT,
  cid_pick_up       TEXT,
  PRIMARY KEY (date_time, master_account, service_no, truck_id, driver_id, cid_drop_off, cid_pick_up)
  FOREIGN KEY (master_account, service_no) REFERENCES service_agreements,
  FOREIGN KEY (truck_id) REFERENCES trucks,
  FOREIGN KEY (driver_id) REFERENCES drivers(pid),
  FOREIGN KEY (cid_drop_off) REFERENCES containers(container_id),
  FOREIGN KEY (cid_pick_up) REFERENCES containers(container_id)
);
```
