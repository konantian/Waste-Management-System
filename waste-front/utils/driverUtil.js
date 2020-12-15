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
        select : {
                location : true, 
                waste_type : true, 
                local_contact : true,
        }
    });

    return information;
}

export const get_container_id = async (prisma, service_no) => {

    const containers = await prisma.serviceFulfillment.findFirst({
        where : {service_no : service_no},
        select : {cid_pick_up : true, cid_drop_off : true}
    });

    return containers;
}

export const get_service_no  = async (prisma, data) => {

    const {pid, start_date, end_date} = data;

    const result = await prisma.serviceFulfillment.findMany({
        where : {driver_id : pid,
                date_time : {
                    gt : start_date,
                    lt : end_date
                }},
        select : {service_no : true}
    });
    return result.map(item => item.service_no);
}

export const get_tour = async (prisma, data) =>{

    const services = await get_service_no(prisma, data);

    let tours = await Promise.all(services.map(async (service_no) => {
        const information = await get_information(prisma, service_no);
        const containers = await get_container_id(prisma, service_no);
        return {
            key : service_no,
            location : information.location,
            local_contact : information.local_contact,
            waste_type : information.waste_type,
            cid_pick_up : containers.cid_pick_up,
            cid_drop_off : containers.cid_drop_off
        }
    }))

    return tours;
}