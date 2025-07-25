// lib/db.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root', // default XAMPP username
  password: '1234', // default XAMPP password (empty)
  database: 'flood_monitoring', // your database name
  port: 3306 // default MySQL port
};

let connection;

export async function connectToDatabase() {
  if (connection) return connection;
  
  connection = await mysql.createConnection(dbConfig);
  return connection;
}

export async function query(sql, params) {
  const conn = await connectToDatabase();
  const [results] = await conn.execute(sql, params);
  return results;
}