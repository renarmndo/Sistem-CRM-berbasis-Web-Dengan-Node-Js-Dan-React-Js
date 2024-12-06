const { db } = require("../config/database"); // Pastikan db diimpor dari config/database.js

const User = {
  create: (userData, callback) => {
    const sql =
      "INSERT INTO users (username, password, email, nama_user, role) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        userData.username,
        userData.password,
        userData.email,
        userData.nama_user,
        userData.role,
      ],
      callback
    );
  },
  findByUsername: (username, callback) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], callback);
  },
};

module.exports = User;
