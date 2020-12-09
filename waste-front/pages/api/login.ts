const bcrypt = require('bcrypt');
import {NextApiRequest, NextApiResponse} from 'next';
import {check_username, get_hash_password, get_user_info} from '../../utils/authUtil';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function login(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }
    
    const {username, password} = req.body;
    const existUsername = await check_username(prisma, username)
    if(!existUsername){
        return res.status(400).json({error : "The username entered does not exist, please input again"});   
    }

    const hash = await get_hash_password(prisma, username);

    if(bcrypt.compareSync(password, hash)){
        const info = await get_user_info(prisma, username);
        info.success = "Welcome to the waste management system!";
        return res.status(200).json(info);
    }else{
        return res.status(400).json({error : "The username and password entered is not matched"});
    }
}