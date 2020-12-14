import {get_accounts} from './accountManagerUtil';

export const check_manager = async (prisma,pid, manager) => {

    const result = await prisma.personnel.findFirst({
        where : {
            supervisor_id : pid,
            pid : manager
        }
    });

    if(!result) return false;
    else return true;
}

export const customer_list = async (prisma, pid) => {

    const result = await prisma.personnel.findMany({
        where : {supervisor_id : pid},
        select : {pid : true}
    });
    const managers = result.map(item => item.pid);

    const customers = await prisma.account.findMany({
        where : {account_mgr : {
            in : managers
        }},
        select : {account_no : true},
        orderBy : {account_no : 'asc'}
    })

    return customers.map(item => item.account_no);
}

export const get_managers = async (prisma, pid) => {

    const result = await prisma.personnel.findMany({
        where : {supervisor_id : pid},
        select : {pid : true,name : true}
    })

    return result;
}

export const get_count = async (prisma, pid) => {

    const accounts = await get_accounts(prisma, pid);
    const service_count = await prisma.serviceAgreement.count({
        where : {master_account : {
            in : accounts
        }}
    });

    return {service_count : service_count, master_count : accounts.length};
}

export const get_sum = async (prisma, pid) => {

    const accounts = await get_accounts(prisma, pid);
    const result = await prisma.serviceAgreement.aggregate({
        sum : {internal_cost : true, price : true},
        where : {master_account : {
            in : accounts
        }}
    });
    return result.sum;
}

export const manager_report = async (prisma, pid) => {

    const managers = await get_managers(prisma, pid);
    const report =  await Promise.all(managers.map(async (manager) => {
        const count = await get_count(prisma, manager.pid);
        const sum = await get_sum(prisma, manager.pid);
        return {manager_name : manager.name,
                master_count : count.master_count,
                service_count : count.service_count,
                price_sum : sum.price,
                cost_sum : sum.internal_cost,
                key : manager.pid
            };
    }));

    return report;
}