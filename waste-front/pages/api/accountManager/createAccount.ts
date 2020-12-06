const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
import {NextApiRequest, NextApiResponse} from 'next';
import {check_new_account} from '../../../utils/accountManagerUtil';

export default async function createAccount(req : NextApiRequest, res : NextApiResponse){

    if(req.method !== 'POST'){
        return res.status(405).json({error : "Method not allowed, please use POST"});
    }
    const db = await sqlite.open({filename: './waste.sqlite',driver: sqlite3.Database});

    const newAccount = await check_new_account(db, req.body.account_no);
    if(!newAccount){
        return res.status(400).json({error : "The account number you entered is existed, please enter another account number"});
    }
    const totalAmount = 0;

    const statement = await db.prepare("INSERT INTO accounts VALUES(:account_no,:account_mgr,:customer_name, \
                                        :contact_info,:customer_type,:start_date,:end_date,:total_amount)");
    await statement.run(req.body.account_no, req.body.account_mgr,req.body.customer_name, req.body.contact_info,
                        req.body.customer_type,req.body.start_date,req.body.end_date,totalAmount);

    return res.status(201).json({success : "New master account has been created"});

}