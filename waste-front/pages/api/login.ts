const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
import {NextApiRequest, NextApiResponse} from 'next';

export default async function login(req : NextApiRequest, res : NextApiResponse){

    const db = await sqlite.open({
        filename: '../../waste.sqlite',
        driver: sqlite3.Database
    });
    
}