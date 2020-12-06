const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
import {NextApiRequest, NextApiResponse} from 'next';
import {get_accounts } from '../../../../utils/accountManagerUtil';

export default async function accounts(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }
    const db = await sqlite.open({filename: './waste.sqlite',driver: sqlite3.Database});
    const accounts = await get_accounts(db, req.query.id);
    res.status(200).json({accounts : accounts});

}