import {check_new_account} from '../../../utils/accountManagerUtil';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function createAccount(req , res ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {account_no, pid, customer_name, contact_info, customer_type, start_date, end_date} = req.body;

    const newAccount = await check_new_account(prisma, account_no);
    if(!newAccount){
        return res.status(400).json({error : "The account number you entered is existed, please enter another account number"});
    }

    const addAccount = await prisma.account.create({
        data : {
            account_no : account_no,
            customer_name : customer_name,
            contact_info : contact_info,
            customer_type : customer_type,
            start_date : start_date,
            end_date : end_date,
            total_amount : 0,
            accountManager : {
                connect : {pid : pid}
            }
        }
    })

    if(addAccount){
        return res.status(201).json({success : "New master account has been created"});
    }else{
        return res.status(400).json({error : "Account cannot be added, please check you data"});
    }
}