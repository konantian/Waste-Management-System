import SQL from 'sql-template-strings';

export const check_pid = async (db, userId) => {

    const result = await db.get(SQL`SELECT pid FROM personnel WHERE pid=${userId}`);
    if(!result) return false;
    else return true;
}

export const check_exist_pid = async (db, userId) => {
    const result = await db.get(SQL`SELECT user_id FROM users WHERE user_id=${userId}`);
    if(result) return true;
    else return false;
}

export const check_username = async (db,username) => {
    const result = await db.get(SQL`SELECT login FROM users WHERE login=${username}`);
    if(result) return true;
    else return false;
}

export const check_role = async (db, userId, role) => {
    let result;
    if(role === 'account manager'){
        result = await db.get(SQL`SELECT pid FROM account_managers WHERE pid = ${userId}`);
    }else if(role === 'driver'){
        result = await db.get(SQL`SELECT pid FROM drivers WHERE pid = ${userId}`);
    }else if(role === 'supervisor'){
        result = await db.get(SQL`SELECT supervisor_pid FROM personnel WHERE supervisor_pid = ${userId}`);
    }
    if(!result) return false;
    else return true;

}

export const get_hash_password = async (db, username) => {

    const hash = await db.get(SQL`SELECT password FROM users WHERE login=${username}`);

    if(hash) return hash.password;

}

export const get_user_info = async (db, username ) => {

    const info = await db.get(SQL`SELECT user_id,role FROM users where login=${username}`);
    const name = await db.get(SQL`SELECT name from personnel where pid=${info.user_id}`);

    if(info.role === 'account manager'){
        info.role = 'accountManager';
    }
    return {"userId" : info.user_id, "role" : info.role, "name" : name.name};
}