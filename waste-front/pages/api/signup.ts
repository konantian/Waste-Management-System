const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
import {NextApiRequest, NextApiResponse} from 'next';
import {check_pid,check_exist_pid,check_username,check_role} from '../../utils/authUtil';

export default async function signup(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const db = await sqlite.open({filename: './waste.sqlite',driver: sqlite3.Database});

    const validUserId = await check_pid(db, req.body.userId);
    if(!validUserId){
        return res.status(400).json({error : "This userId is not valid"});
    }
    const existUserId = await check_exist_pid(db, req.body.userId);
    if(existUserId){
        return res.status(400).json({error : "This userId is already exist, please login directly"});
    }
    const existUsername = await check_username(db, req.body.userId)
    if(existUsername){
        return res.status(400).json({error : "This username has been occupied, please select another username"});
    }
    const validRole = await check_role(db,req.body.userId,req.body.role);
    if(!validRole){
        return res.status(400).json({error : "This role is not matched with the record"});
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const statement = await db.prepare("INSERT INTO users VALUES(:user_id,:role,:login,:password)");
    await statement.run(req.body.userId, req.body.role,req.body.login, hash);
    return res.status(201).json({success : "You are ready to log in"});
}