import SQL from 'sql-template-strings';

export const get_accounts = async (db, pid) => {

    const result = await db.all(SQL`SELECT account_no FROM accounts WHERE account_mgr=${pid}`);
    const accounts = result.map(account => account.account_no);
    return accounts;
}

export const check_account = async (db, pid, account) => {

    const result = await db.get(SQL`SELECT account_no FROM accounts WHERE account_mgr=${pid} AND account_no=${account}`);
    if(!result) return false;
    else return true;
}

export const check_new_account = async (db, account) => {
    
    const result = await db.get(SQL`SELECT account_no FROM accounts WHERE account_no=${account}`);
    if(result) return false;
    else return true;
}

export const get_service_no = async (db) => {

    const number = await db.get(SQL`SELECT max(service_no) + 1 AS service_no FROM service_agreements`);
    return number.service_no;
}

export const update_amount = async (db, account, price) => {

    price = parseFloat(price);
    const current = await db.get(SQL`SELECT total_amount FROM accounts WHERE account_no=${account}`);
    const currentAmount = parseFloat(current.total_amount);
    const newAmount = currentAmount + price;

    const statement = await db.prepare("UPDATE accounts set total_amount=:amount WHERE account_no=:master_account");
    await statement.run(newAmount,account);
    
    const result = await db.get(SQL`SELECT total_amount FROM accounts WHERE account_no=${account}`);
    if(result.total_amount === currentAmount + price) return true;
    else return false;
}

export const customer_information = async (db, account) => {

    const accountData = await db.get(SQL`SELECT * FROM accounts WHERE account_no=${account}`); 
    const serviceData  = await db.all(SQL`SELECT * FROM service_agreements WHERE master_account=${account} ORDER BY service_no`);

    accountData.service_agreements = serviceData;
    accountData.total_amount = accountData.total_amount.toFixed(2);
    accountData.key = "customer_imformation";
    return accountData;
}

export const get_summary_report = async (db, account) => {

    const report = await db.get(SQL`SELECT count(*) AS count,
                                       sum(internal_cost) AS cost_sum,
                                       sum(price) AS price_sum, 
                                       count(distinct waste_type) AS type_count
                                       FROM service_agreements WHERE master_account=${account}`);
                        
    if(report.count === 0){
        return false;
    }
    return report;

}