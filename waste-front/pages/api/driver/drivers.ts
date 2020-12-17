import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';

export default async function getAllDrivers(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const result = await prisma.driver.findMany({
        select : {pid : true}
    });

    const drivers = result.map(item => item.pid).sort();

    await prisma.$disconnect();
    return res.status(200).json({drivers : drivers});
}