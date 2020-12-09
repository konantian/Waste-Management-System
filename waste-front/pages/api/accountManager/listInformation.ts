import {NextApiRequest, NextApiResponse} from 'next';
import {check_account, customer_information} from '../../../utils/accountManagerUtil';
import prisma from '../../../lib/prisma';

export default async function listInformation(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const {pid, account} = req.query;

    const validAccount = await check_account(prisma, pid, account);
    if(!validAccount){
        return res.status(400).json({error : "The master account you inputed does not exist or you have no access right on that account"});
    }
    const accountData = await customer_information(prisma, account);
    return res.status(200).json(accountData);
}