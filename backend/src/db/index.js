import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
let connection;

export async function connectDB() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(config);
      console.log("Connected to database ...");
    } catch (error) {
      console.error("Error connecting to database ...", error);
      throw error;
    }
  }
  return connection;
}

export async function disconnectDB() {
  if (connection) {
    try {
      await connection.end();
      console.log("Connection closed ...");
      connection = null;
    } catch (error) {
      console.error("Error closing the database connection ...", error);
      throw error;
    }
  }
}
