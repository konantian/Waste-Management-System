const bcrypt = require('bcrypt');
import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {check_pid,check_exist_pid,check_username,check_role} from '../../utils/authUtil';

const prisma = new PrismaClient();

export default async function signup(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {userId, role, login, password} = req.body;

    const addUser = await prisma.user.create({
        data : {
            user_id : userId,
            role : role,
            login : login,
            password : password
        }
    })

    if(addUser){
        return res.status(201).json({success : "You are ready to log in"});
    }else{
        return res.status(400).json({error : "Create new user failed"});
    }
    
}