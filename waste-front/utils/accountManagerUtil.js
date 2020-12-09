import SQL from 'sql-template-strings';

export const get_accounts = async (prisma, pid) => {

    const result = await prisma.account.findMany({
        where : {account_mgr : pid},
        select : {account_no : true}
    })

    const accounts = result.map(account => account.account_no);
    return accounts;
}

export const check_account = async (prisma, pid, account) => {

    const result = await prisma.account.findFirst({
        where : {
            account_mgr : pid,
            account_no : account
        }
    })

    if(!result) return false;
    else return true;
}

export const check_new_account = async (prisma, account) => {

    const result = await prisma.account.findFirst({
        where : {account_no : account}
    });
    
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

export const customer_information = async (prisma, account) => {

    const accountData = await prisma.account.findFirst({
        where : { account_no : account}
    });
    const serviceData = await prisma.serviceAgreement.findMany({
        where : { master_account : account},
        orderBy : {service_no : 'asc'}
    })

    accountData.service_agreements = serviceData;
    accountData.total_amount = accountData.total_amount.toFixed(2);
    accountData.key = "customer_imformation";
    return accountData;
}

export const get_summary_report = async (prisma, account) => {

    const result = await prisma.serviceAgreement.aggregate({
        sum : {internal_cost : true, price : true},
        where : {master_account : account}
    })

    const serviceCount = await prisma.serviceAgreement.count({
        where : {master_account : account}
    });
    
    const wasteTypes = await prisma.serviceAgreement.findMany({
        where : { master_account : account},
        distinct: ["waste_type"],
        select : {waste_type : true}
    })
    let report = new Object();

    report.count = serviceCount;
    report.type_count = wasteTypes.length;
    report.price_sum = result.sum['price'];
    report.cost_sum =  result.sum['internal_cost'];

    if(report.count === 0){
        return false;
    }
    return report;

}