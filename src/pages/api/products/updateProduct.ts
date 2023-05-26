import { NextApiRequest, NextApiResponse } from 'next';
import db from '../db'

interface Product {
    quantity: number;
    // other fields from your database schema
  }

export default async function updateHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        
        try {
            const {productId} = req.body;
            const getProductQuery = `SELECT quantity FROM shop WHERE id = ?`;
            
            const rows = await db.query(getProductQuery, [productId]) as unknown as Product[];
            const product = rows[0];
            const updateQuery = 'UPDATE shop SET quantity = quantity - 1 WHERE id = ?';
            await db.query(updateQuery, [productId]);
        
            res.status(200).json({ message: 'Store updated successfully' });
            
            if (!product) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


  }