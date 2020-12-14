import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';

export default async function listTour(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    return res.status(200).json({success : req.method});
}