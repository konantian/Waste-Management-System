import {NextApiRequest, NextApiResponse} from 'next';
import {check_account, 
       check_new_account, 
       update_amount,
       add_agreement} from '../../../utils/accountManagerUtil';
import prisma from '../../../lib/prisma';

export default async function createAgreement(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {account_no, pid, price} = req.body;

    const newAccount = await check_new_account(prisma, account_no);
    if(newAccount){
        await prisma.$disconnect();
        return res.status(400).json({error : "This master account does not exist, please enter again"});
    }

    const validAccount = await check_account(prisma, pid, account_no);
    if(!validAccount){
        await prisma.$disconnect();
        return res.status(400).json({error : "This account does not managed by you, please select another account"});
    }

    const isUpdate = await update_amount(prisma, account_no, price);
    if(!isUpdate){
        await prisma.$disconnect();
        return res.status(400).json({error : "Update total amount failed, please check your data"});
    }

    const addAgreement = await add_agreement(prisma, req.body);
    if(!addAgreement){
        await prisma.$disconnect();
        res.status(400).json({error : "Create service agreement failed, please check you data"});
    }
    await prisma.$disconnect();
    return res.status(201).json({success : "New serivce agreement has been created"});
}