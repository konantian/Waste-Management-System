const bcrypt = require('bcrypt');
import {NextApiRequest, NextApiResponse} from 'next';
import {check_pid,check_exist_pid,check_username,check_role} from '../../utils/authUtil';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default async function signup(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {userId, role, login, password} = req.body;

    const validUserId = await check_pid(prisma, userId);
    if(!validUserId){
        return res.status(400).json({error : "This userId is not valid"});
    }
    const existUserId = await check_exist_pid(prisma, userId);
    if(existUserId){
        return res.status(400).json({error : "This userId is already exist, please login directly"});
    }
    const existUsername = await check_username(prisma, userId)
    if(existUsername){
        return res.status(400).json({error : "This username has been occupied, please select another username"});
    }
    const validRole = await check_role(prisma,userId,role);
    if(!validRole){
        return res.status(400).json({error : "This role is not matched with the record"});
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const addUser = await prisma.user.create({
        data: {
            login : login,
            role : role,
            password : hash,
            personnel : {
                connect : {pid : userId}
            }
            
        }
    })
    if(addUser) return res.status(201).json({success : "You are ready to log in"});
    else return res.status(400).json({error : "User register failed, please check your data"});

}