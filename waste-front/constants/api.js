let host = "http://localhost:5000";

export const LOGIN_API = `${host}/api/login/`;
export const SIGNUP_API = `${host}/api/signup/`;
export const LIST_TOUR_API = `${host}/api/driver/listTour/`;
export const CREATE_ENTRY_API = `${host}/api/dispatcher/createEntry/`;
export const ASSIGN_ACCOUNT_API = `${host}/api/supervisor/assignAccount/`;
export const CUSTOMER_LIST_API = `${host}/api/supervisor/customerList/`;
export const CUSTOMER_REPORT_API = `${host}/api/supervisor/customerReport/`;
export const MANAGER_REPORT_API = `${host}/api/supervisor/managerReport/`;
export const INFORMATION_API = `${host}/api/accountManager/listInformation/`;
export const CREATE_ACCOUNT_API = `${host}/api/accountManager/createAccount/`;
export const SUMMARY_REPORT_API = `${host}/api/accountManager/summaryReport/`;
export const CREATE_AGREEMENT_API = `${host}/api/accountManager/createAgreement/`;
export const TRUCK_API =  (driver_id) => `${host}/api/driver/trucks/${driver_id}`;
export const CONTAINER_API  = (account_no) => `${host}/api/dispatcher/container/${account_no}`;
