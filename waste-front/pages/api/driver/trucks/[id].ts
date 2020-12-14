import {NextApiRequest, NextApiResponse} from 'next';
import {check_driver, get_truck } from '../../../../utils/driverUtil';
import prisma from '../../../../lib/prisma';

export default async function trucks(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const validDriver = await check_driver(prisma, req.query.id);
    if(!validDriver){
        await prisma.$disconnect();
        return res.status(400).json({error : "This driver id does not exist!"});
    }
    
    const truck = await get_truck(prisma, req.query.id);
    await prisma.$disconnect();
    return res.status(200).json({driver_id : req.query.id, truck_id : truck});

}