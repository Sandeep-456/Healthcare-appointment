const fs = require("fs");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  family: 4,
  ssl: {
    ca: fs.readFileSync("./ca.pem"),
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = db;
