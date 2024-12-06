const { db } = require("../config/database");

const Costumer = {
  // Tambahkan pelanggan baru
  create: (costumerData, callback) => {
    const sql = `
      INSERT INTO costumers (
        msidn, full_name, cls, bonus, nik, kk_number, package_id, activate_date, 
        tempat_lahir, tgl_lahir, alamat, no_rumah, rt, rw, desa_kelurahan, 
        kecamatan, kota_kabupaten, provinsi, alamat_domisili, kota_domisili, 
        phone_2, email, whatsapp
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    db.query(
      sql,
      [
        costumerData.msidn,
        costumerData.full_name,
        costumerData.cls,
        costumerData.bonus,
        costumerData.nik,
        costumerData.kk_number,
        costumerData.package_id,
        costumerData.activate_date, // Pastikan nama kolom sesuai
        costumerData.tempat_lahir,
        costumerData.tgl_lahir,
        costumerData.alamat,
        costumerData.no_rumah,
        costumerData.rt,
        costumerData.rw,
        costumerData.desa_kelurahan,
        costumerData.kecamatan,
        costumerData.kota_kabupaten,
        costumerData.provinsi,
        costumerData.alamat_domisili,
        costumerData.kota_domisili,
        costumerData.phone_2,
        costumerData.email,
        costumerData.whatsapp,
      ],
      (err, results) => {
        if (err) {
          console.error("Error inserting costumer data:", err);
          return callback(err, null);
        }
        console.log("Costumer data successfully inserted:", results);
        return callback(null, results);
      }
    );
  },

  // Ambil data pelanggan berdasarkan ID
  getById: (id, callback) => {
    const sql = `SELECT * FROM costumers WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error fetching costumer by ID:", err);
        return callback(err, null);
      }
      return callback(null, results[0]); // Ambil hanya satu hasil
    });
  },

  // Update data pelanggan berdasarkan ID
  updateById: (id, costumerData, callback) => {
    const sql = `
      UPDATE costumers SET 
        msidn = ?, full_name = ?, cls = ?, bonus = ?, nik = ?, kk_number = ?, 
        package_id = ?, activate_date = ?, tempat_lahir = ?, tgl_lahir = ?, 
        alamat = ?, no_rumah = ?, rt = ?, rw = ?, desa_kelurahan = ?, 
        kecamatan = ?, kota_kabupaten = ?, provinsi = ?, alamat_domisili = ?, 
        kota_domisili = ?, phone_2 = ?, email = ?, whatsapp = ? 
      WHERE id = ?`;
    db.query(
      sql,
      [
        costumerData.msidn,
        costumerData.full_name,
        costumerData.cls,
        costumerData.bonus,
        costumerData.nik,
        costumerData.kk_number,
        costumerData.package_id,
        costumerData.activate_date,
        costumerData.tempat_lahir,
        costumerData.tgl_lahir,
        costumerData.alamat,
        costumerData.no_rumah,
        costumerData.rt,
        costumerData.rw,
        costumerData.desa_kelurahan,
        costumerData.kecamatan,
        costumerData.kota_kabupaten,
        costumerData.provinsi,
        costumerData.alamat_domisili,
        costumerData.kota_domisili,
        costumerData.phone_2,
        costumerData.email,
        costumerData.whatsapp,
        id,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating costumer data:", err);
          return callback(err, null);
        }
        return callback(null, results);
      }
    );
  },

  // Hapus data pelanggan berdasarkan ID
  deleteById: (id, callback) => {
    const sql = `DELETE FROM costumers WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error deleting costumer by ID:", err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  },
  //   getAll: (callback) => {
  //     const sql = `SELECT * FROM costumers`;
  //     return db.query(sql);
  //     db.query(sql, (err, results) => {
  //       if (err) {
  //         console.error("Error fetching all costumer data:", err);
  //         return callback(err, null);
  //       }
  //       return callback(null, results); // Kembalikan seluruh hasil
  //     });
  //   },
  // };
  getAll: () => {
    const sql = `SELECT * FROM costumers`;
    return db.query(sql); // Mengembalikan Promise
  },
};

module.exports = Costumer;
