const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
import {NextApiRequest, NextApiResponse} from 'next';
import {check_pid,check_exist_pid,check_username,check_role} from '../../utils/authUtil';

export default async function signup(req : NextApiRequest, res : NextApiResponse){

    const db = await sqlite.open({
        filename: './waste.sqlite',
        driver: sqlite3.Database
    });

    const validUserId = await check_pid(db, req.body.userId);
    if(!validUserId){
        res.status(400).json({error : "This userId is not valid"});
        return;
    }
    const existUserId = await check_exist_pid(db, req.body.userId);
    if(existUserId){
        res.status(400).json({error : "This userId is already exist"});
        return;
    }
    const validUsername = await check_username(db, req.body.userId)
    if(!validUsername){
        res.status(400).json({error : "This username is already exist"});
        return;
    }
    const validRole = await check_role(db,req.body.userId,req.body.role);
    if(!validRole){
        res.status(400).json({error : "This role is not matched with the record"});
        return;
    }
    bcrypt.hash(req.body.password, 12).then(async (hash) => {
        const statement = await db.prepare("INSERT INTO users VALUES(:user_id,:role,:login,:password)");
        const result = await statement.run(req.body.userId, req.body.role,req.body.login, hash);
        res.status(201).json({success : "You are ready to log in"});
    })
}