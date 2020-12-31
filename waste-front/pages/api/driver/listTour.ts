import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';
import { get_tour } from '../../../utils/driverUtil';

export default async function listTour(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const tour = await get_tour(prisma, req.query);

    return res.status(200).json(tour);
}