import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';
import { create_entry, check_own_truck, check_truck} from '../../../utils/dispatcherUtil';

export default async function createEntry(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    const owned_truck_id = await check_own_truck(prisma, req.body.driver_id);
    const validTruck = await check_truck(prisma, req.body.truck_id);
    if(!owned_truck_id && !validTruck){
        await prisma.$disconnect();
        return res.status(400).json({error : "The truck entered is not available,please enter again"});
    }

    const addEntry = await create_entry(prisma, req.body);
    if(!addEntry){
        await prisma.$disconnect();
        return res.status(400).json({error : "This entry cannot be created, please check you data"});
    }
    
    await prisma.$disconnect();
    return res.status(201).json({success : "New entry has been created"});

}