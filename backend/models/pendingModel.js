const db = require("../config/database");

const Pending = {
  // Tambah data pending
  create: (data, callback) => {
    const sql =
      "INSERT INTO data_pending (costumer_id, missing_field, notes) VALUES (?, ?, ?)";
    db.query(sql, [data.costumer_id, data.missing_field, data.notes], callback);
  },

  // Ambil semua data pending
  findAll: (callback) => {
    const sql = "SELECT * FROM data_pending";
    db.query(sql, callback);
  },

  // Cari data pending berdasarkan ID
  findById: (id, callback) => {
    const sql = "SELECT * FROM data_pending WHERE id = ?";
    db.query(sql, [id], callback);
  },

  // Hapus data pending
  deleteById: (id, callback) => {
    const sql = "DELETE FROM data_pending WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Pending;
