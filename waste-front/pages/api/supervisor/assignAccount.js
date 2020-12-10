import {check_new_account, create_account} from '../../../utils/accountManagerUtil';
import {check_manager} from '../../../utils/supervisorUtil';
import prisma from '../../../lib/prisma';

export default async function assignAccount(req , res ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {pid, manager, account_no} = req.body;

    const validManager = await check_manager(prisma, pid, manager);
    if(!validManager){
        return res.status(400).json({error : "This account manager does not supervised by you!"});
    }

    const newAccount = await check_new_account(prisma, account_no);
    if(!newAccount){
        return res.status(400).json({error : "The account number you entered is existed, please enter another account number"});
    }

    const addAccount = await create_account(prisma, req.body, manager);

    if(addAccount){
        return res.status(201).json({success : "New master account has been created"});
    }else{
        return res.status(400).json({error : "Account cannot be added, please check you data"});
    }
}