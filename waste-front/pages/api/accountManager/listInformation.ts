const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
import {NextApiRequest, NextApiResponse} from 'next';
import {check_account, customer_information} from '../../../utils/accountManagerUtil';

export default async function listInformation(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'GET'){
        return res.status(405).json({error : "Method not allowed, please use GET"});
    }
    const db = await sqlite.open({filename: './waste.sqlite',driver: sqlite3.Database});

    const validAccount = await check_account(db, req.query.pid, req.query.account);
    if(!validAccount){
        return res.status(400).json({error : "The master account you inputed does not exist or you have no access right on that account"});
    }
    const accountData = await customer_information(db, req.query.account);
    return res.status(200).json(accountData);
}