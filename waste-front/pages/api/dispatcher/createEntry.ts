import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';
import { create_entry } from '../../../utils/dispatcherUtil';

export default async function createEntry(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }

    
    return res.status(201).json({success : "New entry has been created"});

}