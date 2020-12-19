export const check_pid = async (prisma, userId) => {

    const result = await prisma.personnel.findFirst({
        where : {
            pid : userId,
        }
    })
    if(!result) return false;
    else return true;
}

export const check_exist_pid = async (prisma, userId) => {
    const result = await prisma.user.findFirst({
        where : {
            user_id : userId
        }
    })
    if(result) return true;
    else return false;
}

export const check_username = async (prisma, username) => {
    const result = await prisma.user.findFirst({
        where : {
            login : username
        }
    })
    if(result) return true;
    else return false;
}

export const check_role = async (prisma, userId, role) => {
    let result;
    if(role === 'account manager'){
        result = await prisma.accountManager.findFirst({
            where : {
                pid : userId
            }
        })
    }else if(role === 'driver'){
        result = await prisma.driver.findFirst({
            where : {
                pid : userId
            }
        })
    }else if(role === 'supervisor'){
        result = await prisma.personnel.findFirst({
            where : {
                supervisor_id : userId
            }
        })
    }else if(role === 'dispatcher'){
        return true;
    }
    if(!result) return false;
    else return true;

}

export const get_hash_password = async (prisma, username) => {

    const hash = await prisma.user.findFirst({
        where : {
            login : username,
        }
    })

    if(hash) return hash.password;

}

export const get_user_info = async (prisma, username ) => {

    const info = await prisma.user.findFirst({
        where : {
            login : username
        }
    })
    const name = await prisma.personnel.findFirst({
        where : {
            pid : info.user_id
        }
    })

    if(info.role === 'account manager'){
        info.role = 'accountManager';
    }
    return {"userId" : info.user_id, "role" : info.role, "name" : name.name};

}

export const get_personnel = async (prisma, userId) => {
 
    const info = await prisma.personnel.findFirst({
        where : {pid : userId}
    });

    return info;
}