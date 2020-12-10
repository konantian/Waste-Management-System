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