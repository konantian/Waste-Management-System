import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';

export default async function getAllAgreements(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const result = await prisma.serviceAgreement.findMany({
        select : {service_no : true}
    });

    const services = result.map(item => item.service_no);

    return res.status(200).json({service_no : services});
}