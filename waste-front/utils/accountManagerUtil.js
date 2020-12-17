import {capitalize_Words} from './capitalize';

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

export const get_service_no = async (prisma) => {

    const number = await prisma.serviceAgreement.findMany({
        select : {service_no : true}
    })

    const numbers = number.map(item => parseInt(item.service_no));

    return Math.max(...numbers) + 1;

}

export const update_amount = async (prisma, account, price) => {

    price = parseFloat(price);
    const current = await prisma.account.findFirst({
        where : {account_no : account},
        select : {total_amount : true}
    })

    const currentAmount = parseFloat(current.total_amount);
    const newAmount = currentAmount + price;

    const updateAmount = await prisma.account.update({
        where : {account_no : account},
        data : {total_amount : newAmount}
    });

    if(updateAmount) return true;
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

    for (let index = 0; index < serviceData.length; index++) { 
        serviceData[index].key = index;
        serviceData[index].waste_type = capitalize_Words(serviceData[index].waste_type);
    } 

    accountData.customer_type = capitalize_Words(accountData.customer_type);
    accountData.service_agreements = serviceData;
    accountData.total_amount = accountData.total_amount.toFixed(2);
    accountData.key = "customer_information";
    return accountData;
}

export const get_manager = async (prisma, master_account) => {

    const result = await prisma.account.findFirst({
        where : {account_no : master_account},
        select : {account_mgr : true}
    });

    const manager = await prisma.personnel.findFirst({
        where : {pid : result.account_mgr},
        select : {name : true,pid : true}
    });

    return manager;
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

    const manager = await get_manager(prisma, account);

    let report = new Object();

    report.service_count = serviceCount;
    report.type_count = wasteTypes.length;
    report.price_sum = result.sum['price'];
    report.cost_sum =  result.sum['internal_cost'];
    report.manager_name = manager.name;
    report.manager_id = manager.pid;

    if(report.service_count === 0){
        return false;
    }
    return report;

}

export const create_account = async(prisma, data, manager) => {

    const {account_no, customer_name, contact_info, customer_type, start_date, end_date} = data;

    const addAccount = await prisma.account.create({
        data : {
            account_no : account_no,
            customer_name : customer_name,
            contact_info : contact_info,
            customer_type : customer_type,
            start_date : start_date,
            end_date : end_date,
            total_amount : 0,
            accountManager : {
                connect : {pid : manager}
            }
        }
    })

    return addAccount;
}

export const add_agreement = async(prisma, data) => {

    const {account_no, price, location, waste_type, pick_up_schedule, local_contact, internal_cost} = data;

    const newPrice = parseFloat(price);
    const internalCost = parseFloat(internal_cost);
    const serviceNo = await get_service_no(prisma);

    const addAgreement = await prisma.serviceAgreement.create({
        data : {
            service_no : serviceNo.toString(),
            location : location,
            pick_up_schedule : pick_up_schedule,
            local_contact : local_contact,
            internal_cost : internalCost,
            price : newPrice,
            wasteType : {
                connect : {waste_type : waste_type}
            },
            account : {
                connect : {account_no : account_no}
            }
        }
    })

    return addAgreement;

}