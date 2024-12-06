// module.exports = AgentController;
const { promiseDb } = require("../config/database");

const AgentController = {
  // Menambahkan customer baru
  addCostumer: async (req, res) => {
    const costumerData = req.body;

    // Validasi apakah data penting ada
    if (!costumerData.msidn || !costumerData.full_name) {
      try {
        // Menyimpan data ke tabel pending jika data tidak lengkap
        const sql = `INSERT INTO pending (msidn, full_name, cls, bonus, nik, kk_number, package_id, activate_date, tempat_lahir, tgl_lahir, alamat, no_rumah, rt, rw, desa_kelurahan, kecamatan, kota_kabupaten, provinsi, alamat_domisili, kota_domisili, phone_2, email, whatsapp, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await promiseDb.execute(sql, [
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
          costumerData.status,
        ]);

        return res.status(201).json({
          msg: "Data tidak lengkap, disimpan di tabel pending",
          data: result,
        });
      } catch (error) {
        console.error("Error saat menyimpan data ke tabel pending:", error);
        return res.status(500).json({
          msg: "Gagal menyimpan data ke tabel pending",
          error: error.message,
        });
      }
    }

    // Jika data lengkap, simpan ke tabel customer
    try {
      const sql = `INSERT INTO pending (msidn, full_name, cls, bonus, nik, kk_number, package_id, activate_date, tempat_lahir, tgl_lahir, alamat, no_rumah, rt, rw, desa_kelurahan, kecamatan, kota_kabupaten, provinsi, alamat_domisili, kota_domisili, phone_2, email, whatsapp, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const result = await promiseDb.execute(sql, [
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
        costumerData.status,
      ]);

      return res.status(201).json({
        msg: "Data Berhasil Ditambahkan",
        data: result,
      });
    } catch (error) {
      console.error("Error saat menambahkan customer:", error);
      return res.status(500).json({
        msg: "Data Gagal Ditambahkan",
        error: error.message,
      });
    }
  },

  // delete a customer
  // deleteCustomer: async (req, res) => {
  //   const { msidn } = req.params; // Mengambil msidn dari parameter URL

  //   try {
  //     // Query untuk menghapus data pelanggan berdasarkan msidn
  //     const sql = `DELETE FROM costumers WHERE msidn = ?`;
  //     const result = await promiseDb.execute(sql, [msidn]);

  //     // Mengecek apakah data pelanggan ditemukan dan dihapus
  //     if (result.affectedRows === 0) {
  //       return res.status(404).json({
  //         msg: "Customer not found",
  //       });
  //     }

  //     return res.status(200).json({
  //       msg: "Customer deleted successfully",
  //     });
  //   } catch (error) {
  //     console.error("Error saat menghapus customer:", error);
  //     return res.status(500).json({
  //       msg: "Failed to delete customer",
  //       error: error.message,
  //     });
  //   }
  // },
  deleteCustomer: async (req, res) => {
    const { id } = req.params; // Mengambil msidn dari parameter URL

    try {
      // Query untuk menghapus data pelanggan berdasarkan msidn
      const sql = `DELETE FROM pending WHERE id = ?`;
      const result = await promiseDb.execute(sql, [id]);

      // Mengecek apakah data pelanggan ditemukan dan dihapus
      if (result.affectedRows === 0) {
        return res.status(404).json({
          msg: "Customer not found",
        });
      }

      return res.status(200).json({
        msg: "Customer deleted successfully",
      });
    } catch (error) {
      console.error("Error saat menghapus customer:", error);
      return res.status(500).json({
        msg: "Failed to delete customer",
        error: error.message,
      });
    }
  },

  // Edit data customer
  editCustomer: async (req, res) => {
    const {
      msidn,
      full_name,
      cls,
      bonus,
      nik,
      kk_number,
      package_id,
      activate_date,
      tempat_lahir,
      tgl_lahir,
      alamat,
      no_rumah,
      rt,
      rw,
      desa_kelurahan,
      kecamatan,
      kota_kabupaten,
      provinsi,
      alamat_domisili,
      kota_domisili,
      phone_2,
      email,
      whatsapp,
      status,
      id,
    } = req.body;

    const sql = `UPDATE pending SET msidn = ?, full_name = ?, cls = ?, bonus = ?, nik = ?, kk_number = ?, package_id = ?, activate_date = ?, tempat_lahir = ?, tgl_lahir = ?, alamat = ?, no_rumah = ?, rt = ?, rw = ?, desa_kelurahan = ?, kecamatan = ?, kota_kabupaten = ?, provinsi = ?, alamat_domisili = ?, kota_domisili = ?, phone_2 = ?, email = ?, whatsapp = ?, status = ? WHERE id = ?`;

    try {
      const [results] = await promiseDb.execute(sql, [
        msidn,
        full_name,
        cls,
        bonus,
        nik,
        kk_number,
        package_id,
        activate_date,
        tempat_lahir,
        tgl_lahir,
        alamat,
        no_rumah,
        rt,
        rw,
        desa_kelurahan,
        kecamatan,
        kota_kabupaten,
        provinsi,
        alamat_domisili,
        kota_domisili,
        phone_2,
        email,
        whatsapp,
        status,
        id,
      ]);

      if (results.affectedRows > 0) {
        return res
          .status(200)
          .json({ msg: "Data pelanggan berhasil diperbarui" });
      } else {
        return res.status(404).json({ msg: "Data pelanggan tidak ditemukan" });
      }
    } catch (error) {
      console.error("Error saat mengupdate data pelanggan:", error);
      return res.status(500).json({
        msg: "Gagal memperbarui data pelanggan",
        error: error.message,
      });
    }
  },

  // Mendapatkan semua data customer
  getAllCostumer: async (req, res) => {
    try {
      const sql = `SELECT * FROM pending`;
      const [costumers] = await promiseDb.execute(sql);

      return res.status(200).json({
        msg: "Data customer berhasil didapatkan",
        data: costumers,
      });
    } catch (error) {
      console.log("Gagal mendapatkan data customer:", error);
      return res.status(500).json({
        msg: "Terjadi kesalahan saat mendapatkan data customer",
        error: error.message,
      });
    }
  },
  getCustomerById: async (req, res) => {
    const { id } = req.params;

    try {
      const [customer] = await promiseDb.execute(
        "SELECT * FROM pending WHERE id = ?",
        [id]
      );

      if (customer.length === 0) {
        return res.status(404).json({
          msg: "Customer tidak ditemukan",
        });
      }

      return res.status(200).json(customer[0]);
    } catch (error) {
      return res.status(500).json({
        msg: "Gagal mengambil data customer",
        error: error.message,
      });
    }
  },
};

module.exports = AgentController;
