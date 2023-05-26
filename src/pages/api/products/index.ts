import mysql from 'mysql2/promise';


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

export default async function handler(req:fetchData, res:any) {
    
  try {
    const [rows, fields] = await db.query('SELECT * FROM shop WHERE quantity > 0');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

