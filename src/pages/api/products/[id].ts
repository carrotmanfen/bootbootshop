// pages/api/[id].ts

import { NextApiRequest, NextApiResponse } from 'next'
import db from '../db'

type fetchData = {
    id:number;
    name: string;
    description: string;
    quantity:number;
    cost:number;
    size:number;
    color:string;
    picture:string;
 }

export default async function handler(req: NextApiRequest, res: NextApiResponse<fetchData | { message: string }>) {
  const { id } = req.query

  if (typeof id !== 'string') {
    res.status(400).json({ message: 'Invalid ID parameter' })
    return
  }

  try {
    const connection = await db.getConnection()

    const [rows] = await connection.query<any>(`SELECT * FROM shop WHERE id = ${Number(id)}`)

    if (rows.length === 0) {
      res.status(404).json({ message: `shop with ID ${id} not found` })
      return
    }

    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

