import {NextApiRequest, NextApiResponse} from 'next';
import {check_account, check_new_account, get_service_no, update_amount} from '../../../utils/accountManagerUtil';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function createAgreement(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const {account_no, pid, price, location, waste_type, pick_up_schedule, local_contact, internal_cost} = req.body;

    const newAccount = await check_new_account(prisma, account_no);
    if(newAccount){
        return res.status(400).json({error : "This master account does not exist, please enter again"});
    }

    const validAccount = await check_account(prisma, pid, account_no);
    if(!validAccount){
        return res.status(400).json({error : "This account does not managed by you, please select another account"});
    }

    const serviceNo = await get_service_no(prisma);
    const isUpdate = await update_amount(prisma, account_no, price);
    if(!isUpdate){
        return res.status(400).json({error : "Update total amount failed, please check your data"});

    }

    let newPrice = parseFloat(price);
    let internalCost = parseFloat(internal_cost);

    const addAgreement = await prisma.serviceAgreement.create({
        data : {
            service_no : serviceNo,
            location : location,
            pick_up_schedule : pick_up_schedule,
            local_contact : local_contact,
            internal_cost : internalCost,
            price : newPrice,
            wasteType : {
                connect : {waste_type : waste_type}
            },
            account : {
                connect : {account_no : account_no}
            }
        }
    })

    if(addAgreement) return res.status(201).json({success : "New serivce agreement has been created"});
    else return res.status(400).json({error : "Create service agreement failed, please check you data"});

}