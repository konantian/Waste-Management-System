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

export const check_own_truck = async (prisma, driver_id) => {

    const result = await prisma.driver.findFirst({
        where : {pid : driver_id},
        select : {owned_truck_id : true}
    });

    return result.owned_truck_id;
}

export const check_truck = async (prisma, truck_id) => {

    const owned = await prisma.driver.findMany({
        where : {owned_truck_id : {not : 'NULL'} },
        select : {owned_truck_id : true}
    })

    const owned_trucks = owned.map(item => item.owned_truck_id);

    const result = await prisma.truck.findFirst({
        where : {truck_id : {notIn : owned_trucks},
                 truck_id : truck_id},
    });

    if(result) return true;
    return false;
    
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

    const result = await prisma.$queryRaw('SELECT c.container_id FROM "Container" c WHERE NOT EXISTS (SELECT * FROM "ServiceFulfillment" s WHERE s.cid_drop_off = c.container_id) \
     UNION SELECT c.container_id FROM "Container" c WHERE (SELECT MAX(date_time) FROM "ServiceFulfillment" s WHERE s.cid_pick_up = c.container_id) > \
    (SELECT MAX(date_time) FROM "ServiceFulfillment" s WHERE s.cid_drop_off = c.container_id)')

    const unavailable_containers = result.map(item => item.container_id);

    const available = await prisma.containerWasteType.findMany({
        where : {
            container : {container_id : {in : unavailable_containers}},
            waste_type : {in : waste_types}
        },
        select : {container_id : true}
    });

    const available_containers = available.map(item => item.container_id);

    return available_containers;
}

export const create_entry = async (prisma, data) => {

    const {date_time, agreement, truck_id, driver_id, cid_drop_off} = data;

    const master_account = await get_master_account(prisma, agreement);
    const cid_pick_up = await get_pick_up(prisma, master_account);

    const addEntry = await prisma.serviceFulfillment.create({
        data : {
            date_time : date_time,
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

