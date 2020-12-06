const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
import {NextApiRequest, NextApiResponse} from 'next';
import {check_account, check_new_account, get_service_no, update_amount} from '../../../utils/accountManagerUtil';

export default async function createAgreement(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }
    const db = await sqlite.open({filename: './waste.sqlite',driver: sqlite3.Database});

    const newAccount = await check_new_account(db, req.body.account_no);
    if(newAccount){
        return res.status(400).json({error : "This master account does not exist, please enter again"});
    }

    const validAccount = await check_account(db, req.body.pid, req.body.account_no);
    if(!validAccount){
        return res.status(400).json({error : "This account does not managed by you, please select another account"});
    }

    const serviceNo = await get_service_no(db);
    const isUpdate = await update_amount(db, req.body.account_no, req.body.price);
    if(!isUpdate){
        return res.status(400).json({error : "Update total amount failed, please check your data"});
    }
    const statement = await db.prepare("INSERT INTO service_agreements VALUES(:service_no,:master_account, \
                            :location,:waste_type,:pick_up_schedule,:local_contact,:internal_cost,:price)");
    await statement.run(serviceNo,req.body.account_no,req.body.location,req.body.waste_type,req.body.pick_up_schedule,
                        req.body.local_contact,req.body.internal_cost,req.body.price);
    return res.status(201).json({success : "New serivce agreement has been created"});

}