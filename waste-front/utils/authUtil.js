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
    if(result) return false;
    else return true;
}

export const check_role = async (db, userId, role) => {
    let result;
    if(role === 'account manager'){
        result = await db.get(SQL`SELECT pid from account_managers where pid = ${userId}`);
    }else if(role === 'driver'){
        result = await db.get(SQL`SELECT pid from drivers where pid = ${userId}`);
    }else if(role === 'supervisor'){
        result = await db.get(SQL`SELECT supervisor_pid from personnel where supervisor_pid = ${userId}`);
    }
    if(!result) return false;
    else return true;

}