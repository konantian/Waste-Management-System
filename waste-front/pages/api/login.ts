const bcrypt = require('bcrypt');
import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {check_username, get_hash_password, get_user_info} from '../../utils/authUtil';

const prisma = new PrismaClient();

export default async function login(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {username, password} = req.body;

    const result = await prisma.user.findFirst({
        where : {
            login : username,
            password : password
        }
    })

    if(!result){
        return res.status(400).json({error : "The username and password entered is not matched"});
    }else{
        const info = {
            success : "Welcome to the waste management system!",
            role : "accountManager",
            userId : "34725",
            name : "Tony Wang"
        }
        return res.status(200).json(info)
    }
}