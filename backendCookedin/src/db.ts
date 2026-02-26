import mysql from "mysql2";

// Create connection pool (better than single connection)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",   // If you set password, put it here
  database: "cookedin"
});

// Export promise-based version
export const db = pool.promise()