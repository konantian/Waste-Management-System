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