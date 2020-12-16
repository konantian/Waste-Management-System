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
        select : {waste_type : true}
    });

    const types = result.map(item => item.waste_type);
    return types;
}

export const get_available_containers = async (prisma, agreement) => {

    const master_account = await get_master_account(prisma, agreement);

    const waste_types = await get_waste_types(prisma, master_account);

    const drop_off_result = await prisma.serviceFulfillment.findMany({
        select : {cid_drop_off : true}
    });

    const drop_off_containers = drop_off_result.map(item => item.cid_drop_off);

    const available_result = await prisma.container.findMany({
        where : { 
            container_id : {
                notIn : drop_off_containers,
            }
        },
        select : {container_id : true}
    });

    const available = available_result.map(item => item.container_id);

    let waste_result = await Promise.all(waste_types.map(async (type) => {
        const result = await prisma.containerWasteType.findMany({
            where : {waste_type : type},
            select : {container_id : true}
        });
        return result.map(item => item.container_id);
    }))

    let waste_containers = [];
    waste_result.forEach(item => {
        item.forEach(cid => {
            waste_containers.push(cid);
        })
    })

    const available_containers = waste_containers.map(cid => {
        if(available.includes(cid)) return cid;
    })

    const containers = [];
    available_containers.forEach(item => {
        if(item) containers.push(item);
    })
    return [...new Set(containers)];
}

export const create_entry = async (prisma,data) => {

    const {date_time, agreement, truck_id, driver_id, cid_drop_off} = data;

    const master_account = await get_master_account(prisma, agreement);
    const cid_pick_up = await get_pick_up(prisma, master_account);

    const addEntry = await prisma.serviceFulfillment.create({
        data : {
            data_time : date_time,
            master_account : master_account,
            service_no : agreement,
            cid_drop_off : cid_drop_off,
            cid_pick_up : cid_pick_up,
            truck : {
                connect : {truck_id : truck_id}
            },
            driver : {
                connect : {pid : driver_id}
            }
        }
    });

    return addEntry;
}

