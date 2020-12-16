export const get_master_account = async (prisma, service_no) => {

    const result = await prisma.serviceAgreement.findFirst({
        where : {service_no : service_no},
        select : {master_account : true}
    });

    return result.master_account;
}

export const get_pick_up = async (prisma, master_account) => {

    const result = await prisma.serviceFulfillment.findFirst({
        where : {master_account : master_account},
        orderBy : {date_time : 'desc'},
        select : {cid_drop_off : true}
    });

    if(!result) return '0000';
    return result.cid_drop_off;
}

export const get_waste_types = async (prisma, master_account) => {

    const result = await prisma.serviceAgreement.findMany({
        where : {master_account : master_account},
        select : {waste_type}
    });

    return result.map(item => item.waste_type);
}

