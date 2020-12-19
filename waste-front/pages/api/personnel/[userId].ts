import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';
import {get_personnel} from '../../../utils/authUtil';

export default async function getPersonnelById(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const personnel = await get_personnel(prisma, req.query.userId);

    return res.status(200).json(personnel);
}