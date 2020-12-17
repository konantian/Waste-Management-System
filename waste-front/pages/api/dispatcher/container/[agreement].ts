import {NextApiRequest, NextApiResponse} from 'next';
import { get_available_containers } from '../../../../utils/dispatcherUtil';
import prisma from '../../../../lib/prisma';

export default async function containers(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const containers = await get_available_containers(prisma, req.query.agreement);
    if(!containers){
        await prisma.$disconnect();
        return res.status(400).json({error : "This agreement does not exist!"});
    }

    await prisma.$disconnect();
    return res.status(200).json({containers : containers});
}