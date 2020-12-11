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

    const managers = await prisma.personnel.findMany({
        where : {supervisor_id : pid},
        select : {pid : true}
    })

    return managers;
}