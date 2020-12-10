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

    const customers = await prisma.accounts.findMany({
        where : {account_mgr : {
            in : managers
        }},
        select : {account_no : true}
    })

    return customers;
}

export const get_managers = async (prisma, pid) => {

    const managers = await prisma.personnel.findMany({
        where : {supervisor_id : pid},
        select : {pid : true}
    })

    return managers;
}

export const get_manager_name = async (prisma, master_account) => {

    const result = await prisma.account.findFirst({
        where : {account_no : master_account},
        select : {account_mgr : true}
    });

    const name = await prisma.personnel.findFirst({
        where : {pid : result.account_mgr},
        select : {name : true}
    });

    return name;
}