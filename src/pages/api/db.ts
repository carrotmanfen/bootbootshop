import mysql from 'mysql2/promise';


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3307 ,
  password: '',
  database: 'bootbootshop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db