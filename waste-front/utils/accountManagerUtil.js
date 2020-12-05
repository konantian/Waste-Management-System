import SQL from 'sql-template-strings';

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