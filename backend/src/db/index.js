import mysql from "mysql2/promise";

const config = {
  host: "ls-54bd0f330f4c2a47b264f2509f70bdd76d45264e.c3oyo6c0m2jn.ap-south-1.rds.amazonaws.com",
  user: "abhishek",
  password: "Abhishek$62040",
  database: "dbecommerce",
};
let connection;

export  async function connectDB() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(config);
      console.log("Connected to database ...");
    } catch (error) {
      console.error("Error connecting to database ...", error);
      throw error; // rethrow the error after logging it
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

