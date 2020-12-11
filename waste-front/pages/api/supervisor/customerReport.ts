import {NextApiRequest, NextApiResponse} from 'next';
import {check_new_account, get_summary_report} from '../../../utils/accountManagerUtil';
import prisma from '../../../lib/prisma';

export default async function customerReport(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const newAccount = await check_new_account(prisma, req.query.account);
    if(newAccount){
        await prisma.$disconnect();
        return res.status(400).json({error : "The master account you inputed does not exist!"});
    }

    const report = await get_summary_report(prisma, req.query.account);
    if(!report){
        await prisma.$disconnect();
        return res.status(400).json({error : "This account has no data to generate the report"});
    }

    await prisma.$disconnect();
    return res.status(200).json(report);
}