import {NextApiRequest, NextApiResponse} from 'next';
import { manager_report } from '../../../utils/supervisorUtil';
import prisma from '../../../lib/prisma';

export default async function managerReport(req : NextApiRequest, res : NextApiResponse ){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }

    const report = await manager_report(prisma, req.query.pid);
    if(!report){
        return res.status(400).json({error : "This supervisor has no data to generate the report"});
    }

    return res.status(200).json(report);
}