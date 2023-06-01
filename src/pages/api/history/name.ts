import db from '../db'
import { NextApiRequest, NextApiResponse } from 'next'

type historyData = {
    productId:number;
    addressFrom:string;
    accountName:string;
 }

 export default async function handler(req: NextApiRequest, res: NextApiResponse<historyData | { message: string }>) {
    const { name } = req.query
  
    if (typeof name !== 'string') {
      res.status(400).json({ message: 'Invalid ID parameter' })
      return
    }
  
    try {
      const connection = await db.getConnection()
  
      const [rows] = await connection.query<any>(`SELECT * FROM history WHERE contract_name = '${name}'`)
  
      if (rows.length === 0) {
        res.status(404).json({ message: `history with  ${name} not found` })
        return
      }
  
      res.status(200).json(rows)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }