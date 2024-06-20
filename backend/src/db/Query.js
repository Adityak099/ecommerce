import { connectDB, disconnectDB } from "../db/index.js";

export async function executeQuery(query, params) {
  try {
    const connection = await connectDB();
    const [rows, fields] = await connection.execute(query, params);
    disconnectDB();
    return rows;
  } catch (error) {
    console.error("Error executing query ...", error);
    throw error;
  }
}
