// const mysql = require("mysql2");
// const dotenv = require("dotenv");

// dotenv.config();

// const db = mysql
//   .createPool({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASS || "", // Default kosong
//     database: process.env.DB_NAME, // Ganti dengan nama database Anda
//   })
//   .promise(); // Mengaktifkan dukungan promise

// console.log("Connected to Database");

// module.exports = { db }; // Ekspor langsung tanpa object wrapping

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "", // Default kosong
  database: process.env.DB_NAME, // Ganti dengan nama database Anda
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Tambahkan fungsi wrapper
const promiseDb = {
  execute: (sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (error, results) => {
        if (error) return reject(error);
        resolve([results]);
      });
    });
  },
};

const getConnection = () => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) return reject(err);
      resolve(connection);
    });
  });
};

console.log("Connected to Database");

module.exports = { db, promiseDb, getConnection };
