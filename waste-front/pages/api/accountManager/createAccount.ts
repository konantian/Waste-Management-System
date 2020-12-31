import {NextApiRequest, NextApiResponse} from 'next';
import {check_new_account, create_account} from '../../../utils/accountManagerUtil';
import prisma from '../../../lib/prisma';

export default async function createAccount(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {pid, account_no} = req.body;

    const newAccount = await check_new_account(prisma, account_no);
    if(!newAccount){
        return res.status(400).json({error : "The account number you entered is existed, please enter another account number"});
    }

    const addAccount = await create_account(prisma, req.body, pid);

    if(!addAccount){
        return res.status(400).json({error : "Account cannot be added, please check you data"});
    }
    return res.status(201).json({success : "New master account has been created"});
}