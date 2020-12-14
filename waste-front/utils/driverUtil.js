export const check_driver = async (prisma, driver_id) => {

    const result = await prisma.driver.findFirst({
        where : {pid : driver_id}
    });
    if(!result) return false;
    return true;
}

export const get_truck = async (prisma, driver_id) => {

    const truck = await prisma.driver.findFirst({ 
        where : {pid: driver_id},
        select : {owned_truck_id : true}
    });

    return truck.owned_truck_id;
}

export const get_information = async (prisma, service_no) => {

    const information = await prisma.serviceAgreement.findFirst({
        where : {service_no : service_no},
        select : {location : true, waste_type : true, local_contact : true}
    });

    return information;
}

export const get_container = async (prisma,service_no, driver_id) => {
    const container = await prisma.container.findFirst({
        where : {service_no : service_no, driver_id : driver_id},
        select : {cid_pick_up : true, cid_drop_off : true}
    });

    return container;
}