import db from '../db'
import { NextApiRequest, NextApiResponse } from 'next';

type historyData = {
    productId:number;
    addressFrom:string;
    accountName:string;
 }

 export default async function createHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {productId,addressFrom,accountName} = req.body;
            await db.query('INSERT INTO history(product_id, address,contract_name) VALUES (?,?,?)',[Number(productId),String(addressFrom),String(accountName)] )as unknown as historyData[];
            res.status(200).json({ message: 'Data inserted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
  }
}