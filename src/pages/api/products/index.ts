import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3307 ,
  user: 'root',
  password: '',
  database: 'bootbootshop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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
    const [rows, fields] = await pool.query('SELECT * FROM shop');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

