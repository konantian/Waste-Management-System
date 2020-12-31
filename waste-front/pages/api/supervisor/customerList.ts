import {NextApiRequest, NextApiResponse} from 'next';
import {customer_list} from '../../../utils/supervisorUtil';
import prisma from '../../../lib/prisma';

export default async function customerList(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const customers = await customer_list(prisma, req.query.pid);
    return res.status(200).json({customers : customers});
}