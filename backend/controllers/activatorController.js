const { promiseDb } = require("../config/database");
const Costumer = require("../models/costumerModel");

const ActivatorController = {
  activatorCostumer: (req, res) => {
    const { costumerId } = req.body;
    res.send("Costumer Berhasil Diaktifkan");
  },

  approveCostumer: async (req, res) => {
    try {
      const { id } = req.body;

      // Ambil data dari tabel pending berdasarkan ID
      const getPendingQuery = "SELECT * FROM pending WHERE id = ?";
      const [pendingData] = await promiseDb.execute(getPendingQuery, [id]);

      if (pendingData.length === 0) {
        return res.status(404).json({ msg: "Data tidak ditemukan" });
      }

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
      } = pendingData[0];
      // Update status di tabel pending menjadi 'success'
      const updatePendingQuery =
        "UPDATE pending SET status = 'success' WHERE id = ?";
      await promiseDb.execute(updatePendingQuery, [id]);

      // Masukkan data ke tabel costumer dengan status 'activated'
      const insertCostumerQuery = `
    INSERT INTO costumers (
      msidn, full_name, cls, bonus, nik, kk_number,
      package_id, activate_date, tempat_lahir, tgl_lahir,
      alamat, no_rumah, rt, rw, desa_kelurahan,
      kecamatan, kota_kabupaten, provinsi,
      alamat_domisili, kota_domisili,
      phone_2, email, whatsapp, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'activated')
  `;
      await promiseDb.execute(insertCostumerQuery, [
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
      ]);

      // // Hapus data dari tabel pending
      // const deletePendingQuery = "DELETE FROM pending WHERE id = ?";
      // await promiseDb.execute(deletePendingQuery, [pendingId]);

      // Berikan respons sukses
      res.status(200).json({
        msg: "Data berhasil diapprove, status diperbarui menjadi 'success', dan ditambahkan ke tabel costumer",
      });
    } catch (error) {
      console.error("Approve Error: ", error);
      res.status(500).json({
        msg: "Terjadi kesalahan saat mengapprove data",
        error: error.message,
      });
    }
  },
  // approveCostumer: async (req, res) => {
  //   const connection = await promiseDb.getConnection();

  //   try {
  //     await connection.beginTransaction();

  //     // Ubah dari pendingId menjadi id untuk konsistensi
  //     const { id } = req.body;

  //     if (!id) {
  //       await connection.rollback();
  //       return res.status(400).json({ msg: "ID harus disertakan" });
  //     }

  //     // Ambil data dari tabel pending
  //     const getPendingQuery = "SELECT * FROM pending WHERE id = ?";
  //     const [pendingData] = await connection.execute(getPendingQuery, [id]);

  //     if (pendingData.length === 0) {
  //       await connection.rollback();
  //       return res.status(404).json({ msg: "Data tidak ditemukan" });
  //     }

  //     const customerData = pendingData[0];

  //     // Update status pending
  //     const updatePendingQuery =
  //       "UPDATE pending SET status = 'success' WHERE id = ?";
  //     await connection.execute(updatePendingQuery, [id]);

  //     // Insert ke tabel costumer
  //     const insertCostumerQuery = `
  //       INSERT INTO costumer (
  //         msidn, full_name, cls, bonus, nik, kk_number,
  //         package_id, activate_date, tempat_lahir, tgl_lahir,
  //         alamat, no_rumah, rt, rw, desa_kelurahan,
  //         kecamatan, kota_kabupaten, provinsi,
  //         alamat_domisili, kota_domisili,
  //         phone_2, email, whatsapp, status
  //       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'activated')
  //     `;

  //     await connection.execute(insertCostumerQuery, [
  //       customerData.msidn,
  //       customerData.full_name,
  //       customerData.cls,
  //       customerData.bonus,
  //       customerData.nik,
  //       customerData.kk_number,
  //       customerData.package_id,
  //       customerData.activate_date,
  //       customerData.tempat_lahir,
  //       customerData.tgl_lahir,
  //       customerData.alamat,
  //       customerData.no_rumah,
  //       customerData.rt,
  //       customerData.rw,
  //       customerData.desa_kelurahan,
  //       customerData.kecamatan,
  //       customerData.kota_kabupaten,
  //       customerData.provinsi,
  //       customerData.alamat_domisili,
  //       customerData.kota_domisili,
  //       customerData.phone_2,
  //       customerData.email,
  //       customerData.whatsapp,
  //     ]);

  //     // Commit transaksi
  //     await connection.commit();

  //     res.status(200).json({
  //       msg: "Data berhasil diapprove",
  //     });
  //   } catch (error) {
  //     // Rollback transaksi jika terjadi kesalahan
  //     await connection.rollback();

  //     console.error("Approve Error: ", error);
  //     res.status(500).json({
  //       msg: "Terjadi kesalahan saat mengapprove data",
  //       error: error.message,
  //     });
  //   } finally {
  //     // Lepaskan koneksi
  //     connection.release();
  //   }
  // },

  // Tambahkan route baru untuk get pending data
  getPendingData: async (req, res) => {
    try {
      const query = "SELECT * FROM pending WHERE status = 'pending'";
      const [results] = await promiseDb.execute(query);

      res.status(200).json({
        data: results,
      });
    } catch (error) {
      console.error("Get Pending Data Error: ", error);
      res.status(500).json({
        msg: "Terjadi kesalahan saat mengambil data pending",
        error: error.message,
      });
    }
  },
};

module.exports = ActivatorController;
