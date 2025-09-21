import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,   // 👈 add port here
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully on port", process.env.DB_PORT);
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}

testConnection();

export default pool;
