import {NextApiRequest, NextApiResponse} from 'next';
import {get_accounts } from '../../../../utils/accountManagerUtil';
import prisma from '../../../../lib/prisma';

export default async function accounts(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const accounts = await get_accounts(prisma, req.query.id);
    await prisma.$disconnect();
    return res.status(200).json({accounts : accounts});
}