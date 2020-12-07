const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
import {check_username, get_hash_password, get_user_info} from '../../utils/authUtil';

export default async function login(req , res ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const db = await sqlite.open({filename: './waste.sqlite',driver: sqlite3.Database});

    const existUsername = await check_username(db, req.body.username)
    if(!existUsername){
        return res.status(400).json({error : "The username entered does not exist, please input again"});   
    }

    const hash = await get_hash_password(db, req.body.username);

    if(bcrypt.compareSync(req.body.password, hash)){
        const info = await get_user_info(db, req.body.username);
        info.success = "Welcome to the waste management system!";
        return res.status(200).json(info);
    }else{
        return res.status(400).json({error : "The username and password entered is not matched"});
    }
}