import {NextApiRequest, NextApiResponse} from 'next';
import {check_account, check_new_account, get_summary_report} from '../../../utils/accountManagerUtil';
import prisma from '../../../lib/prisma';

export default async function listInformation(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const {account, pid} = req.query;

    const newAccount = await check_new_account(prisma, account);
    if(newAccount){
        return res.status(400).json({error : "This master account does not exist, please enter again"})
    }

    const validAccount = await check_account(prisma, pid, account);
    if(!validAccount){
        return res.status(400).json({error : "This account does not managed by you, please select another account"});
    }

    const report = await get_summary_report(prisma, account);
    if(!report){
        return res.status(400).json({error : "This account has no data to generate the report"});
    }
    return res.status(200).json(report);

}