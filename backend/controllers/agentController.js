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
  // editCustomer: async (req, res) => {
  //   const { id } = req.params;
  //   const {
  //     msidn,
  //     full_name,
  //     cls,
  //     bonus,
  //     nik,
  //     kk_number,
  //     package_id,
  //     activate_date,
  //     tempat_lahir,
  //     tgl_lahir,
  //     alamat,
  //     no_rumah,
  //     rt,
  //     rw,
  //     desa_kelurahan,
  //     kecamatan,
  //     kota_kabupaten,
  //     provinsi,
  //     alamat_domisili,
  //     kota_domisili,
  //     phone_2,
  //     email,
  //     whatsapp,
  //   } = req.body;

  //   const sql = `UPDATE pending SET msidn = ?, full_name = ?, cls = ?, bonus = ?, nik = ?, kk_number = ?, package_id = ?, activate_date = ?, tempat_lahir = ?, tgl_lahir = ?, alamat = ?, no_rumah = ?, rt = ?, rw = ?, desa_kelurahan = ?, kecamatan = ?, kota_kabupaten = ?, provinsi = ?, alamat_domisili = ?, kota_domisili = ?, phone_2 = ?, email = ?, whatsapp = ?,  WHERE id = ?`;

  //   try {
  //     const [results] = await promiseDb.execute(sql, [
  //       msidn,
  //       full_name,
  //       cls,
  //       bonus,
  //       nik,
  //       kk_number,
  //       package_id,
  //       activate_date,
  //       tempat_lahir,
  //       tgl_lahir,
  //       alamat,
  //       no_rumah,
  //       rt,
  //       rw,
  //       desa_kelurahan,
  //       kecamatan,
  //       kota_kabupaten,
  //       provinsi,
  //       alamat_domisili,
  //       kota_domisili,
  //       phone_2,
  //       email,
  //       whatsapp,
  //       id,
  //     ]);

  //     if (results.affectedRows > 0) {
  //       return res
  //         .status(200)
  //         .json({ msg: "Data pelanggan berhasil diperbarui" });
  //     } else {
  //       return res.status(404).json({ msg: "Data pelanggan tidak ditemukan" });
  //     }
  //   } catch (error) {
  //     console.error("Error saat mengupdate data pelanggan:", error);
  //     return res.status(500).json({
  //       msg: "Gagal memperbarui data pelanggan",
  //       error: error.message,
  //     });
  //   }
  // },

  // editCustomer: async (req, res) => {
  //   const { id } = req.params;

  //   // Validasi ID
  //   if (!id) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "ID pelanggan diperlukan",
  //     });
  //   }

  //   // Destructure semua field dari request body
  //   const {
  //     msidn,
  //     full_name,
  //     cls,
  //     bonus,
  //     nik,
  //     kk_number,
  //     package_id,
  //     activate_date,
  //     tempat_lahir,
  //     tgl_lahir,
  //     alamat,
  //     no_rumah,
  //     rt,
  //     rw,
  //     desa_kelurahan,
  //     kecamatan,
  //     kota_kabupaten,
  //     provinsi,
  //     alamat_domisili,
  //     kota_domisili,
  //     phone_2,
  //     email,
  //     whatsapp,
  //   } = req.body;

  //   // Query SQL dengan WHERE clause yang benar
  //   const sql = `
  //       UPDATE pending
  //       SET
  //           msidn = ?,
  //           full_name = ?,
  //           cls = ?,
  //           bonus = ?,
  //           nik = ?,
  //           kk_number = ?,
  //           package_id = ?,
  //           activate_date = ?,
  //           tempat_lahir = ?,
  //           tgl_lahir = ?,
  //           alamat = ?,
  //           no_rumah = ?,
  //           rt = ?,
  //           rw = ?,
  //           desa_kelurahan = ?,
  //           kecamatan = ?,
  //           kota_kabupaten = ?,
  //           provinsi = ?,
  //           alamat_domisili = ?,
  //           kota_domisili = ?,
  //           phone_2 = ?,
  //           email = ?,
  //           whatsapp = ?
  //       WHERE id = ?
  //   `;

  //   try {
  //     // Eksekusi query dengan parameter yang lengkap
  //     const [results] = await promiseDb.execute(sql, [
  //       msidn,
  //       full_name,
  //       cls,
  //       bonus,
  //       nik,
  //       kk_number,
  //       package_id,
  //       activate_date,
  //       tempat_lahir,
  //       tgl_lahir,
  //       alamat,
  //       no_rumah,
  //       rt,
  //       rw,
  //       desa_kelurahan,
  //       kecamatan,
  //       kota_kabupaten,
  //       provinsi,
  //       alamat_domisili,
  //       kota_domisili,
  //       phone_2,
  //       email,
  //       whatsapp,
  //       id, // Tambahkan id sebagai parameter terakhir
  //     ]);

  //     // Cek apakah update berhasil
  //     if (results.affectedRows > 0) {
  //       return res.status(200).json({
  //         success: true,
  //         message: "Data pelanggan berhasil diperbarui",
  //         updatedRows: results.affectedRows,
  //       });
  //     } else {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Pelanggan dengan ID tersebut tidak ditemukan",
  //       });
  //     }
  //   } catch (error) {
  //     // Log error untuk debugging
  //     console.error("Error saat mengupdate data pelanggan:", error);

  //     return res.status(500).json({
  //       success: false,
  //       message: "Gagal memperbarui data pelanggan",
  //       errorDetail: error.message,
  //     });
  //   }
  // },

  // customerController.js

  // updateUser: async (req, res) => {
  //   const { id } = req.params;
  //   const userData = req.body;

  //   // Daftar field yang diperbolehkan untuk diupdate
  //   const allowedFields = [
  //     "msidn",
  //     "full_name",
  //     "cls",
  //     "bonus",
  //     "nik",
  //     "kk_number",
  //     "package_id",
  //     "activate_date",
  //     "tempat_lahir",
  //     "tgl_lahir",
  //     "alamat",
  //     "no_rumah",
  //     "rt",
  //     "rw",
  //     "desa_kelurahan",
  //     "kecamatan",
  //     "kota_kabupaten",
  //     "provinsi",
  //     "alamat_domisili",
  //     "kota_domisili",
  //     "phone_2",
  //     "email",
  //     "whatsapp",
  //   ];

  //   // Validasi input dasar
  //   if (!id) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "ID pengguna diperlukan",
  //     });
  //   }

  //   // Validasi dan filter field
  //   const updateFields = {};
  //   Object.keys(userData).forEach((key) => {
  //     if (
  //       allowedFields.includes(key) &&
  //       userData[key] !== undefined &&
  //       userData[key] !== null
  //     ) {
  //       // Tambahkan validasi spesifik untuk beberapa field
  //       switch (key) {
  //         case "email":
  //           if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData[key])) {
  //             throw new Error("Format email tidak valid");
  //           }
  //           break;
  //         // case "nik":
  //         //   if (!/^\d{16}$/.test(userData[key])) {
  //         //     throw new Error("NIK harus 16 digit angka");
  //         //   }
  //         //   break;
  //         // case "tgl_lahir":
  //         //   // Validasi format tanggal (YYYY-MM-DD)
  //         //   if (!/^\d{4}-\d{2}-\d{2}$/.test(userData[key])) {
  //         //     throw new Error(
  //         //       "Format tanggal lahir tidak valid. Gunakan YYYY-MM-DD"
  //         //     );
  //         //   }
  //         //   break;
  //         case "activated_date":
  //           if (!/^\d{4}-\d{2}-\d{2}$/.test(userData[key])) {
  //             throw new Error(
  //               "Format tanggsl Aktivasi tidak valid. Gunakan YYYY-MM-DD"
  //             );
  //           }
  //           break;
  //       }

  //       updateFields[key] = userData[key];
  //     }
  //   });

  //   // Validasi apakah ada field yang akan diupdate
  //   if (Object.keys(updateFields).length === 0) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Tidak ada data valid untuk diupdate",
  //     });
  //   }

  //   // Siapkan query dinamis
  //   const setClauses = Object.keys(updateFields)
  //     .map((key) => `${key} = ?`)
  //     .join(", ");

  //   const values = [...Object.values(updateFields), id];

  //   const query = `
  //       UPDATE pending
  //       SET ${setClauses}
  //       WHERE id = ?
  //   `;

  //   try {
  //     const [result] = await promiseDb.execute(query, values);

  //     if (result.affectedRows === 0) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Pengguna tidak ditemukan",
  //       });
  //     }

  //     // Ambil data pengguna terbaru dengan field terbatas
  //     const [updatedUser] = await promiseDb.execute(
  //       `SELECT
  //               id, msidn, full_name, email, nik,
  //               activate_date, tgl_lahir, alamat,
  //               kota_kabupaten, provinsi
  //           FROM pending
  //           WHERE id = ?`,
  //       [id]
  //     );

  //     res.status(200).json({
  //       success: true,
  //       message: "Data pengguna berhasil diperbarui",
  //       data: updatedUser[0],
  //     });
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: error.message || "Gagal memperbarui data pengguna",
  //     });
  //   }
  // },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    // Daftar field yang diperbolehkan untuk diupdate
    const allowedFields = [
      "msidn",
      "full_name",
      "cls",
      "bonus",
      "nik",
      "kk_number",
      "package_id",
      "activate_date",
      "tempat_lahir",
      "tgl_lahir",
      "alamat",
      "no_rumah",
      "rt",
      "rw",
      "desa_kelurahan",
      "kecamatan",
      "kota_kabupaten",
      "provinsi",
      "alamat_domisili",
      "kota_domisili",
      "phone_2",
      "email",
      "whatsapp",
    ];

    // Validasi input dasar
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID pengguna diperlukan",
      });
    }

    // Validasi dan filter field
    const updateFields = {};
    Object.keys(userData).forEach((key) => {
      if (
        allowedFields.includes(key) &&
        userData[key] !== undefined &&
        userData[key] !== null
      ) {
        // Validasi spesifik untuk beberapa field
        switch (key) {
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData[key])) {
              throw new Error("Format email tidak valid");
            }
            break;
          case "activate_date":
            // Validasi format tanggal (YYYY-MM-DD)
            const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
            if (!dateRegex.test(userData[key])) {
              throw new Error(
                "Format tanggal aktivasi tidak valid. Gunakan format ISO 8601"
              );
            }
            // Mengonversi tanggal ISO ke format yang sesuai dengan MySQL (YYYY-MM-DD HH:MM:SS)
            updateFields[key] = new Date(userData[key])
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
          case "tgl_lahir":
            // Parsing tanggal dari timestamp ISO
            const birthDate = new Date(userData[key]);
            const formattedBirthDate = birthDate.toISOString().split("T")[0];

            // Validasi format tanggal (YYYY-MM-DD)
            const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!birthDateRegex.test(formattedBirthDate)) {
              throw new Error(
                "Format tanggal lahir tidak valid. Gunakan YYYY-MM-DD"
              );
            }
            updateFields[key] = formattedBirthDate;
            break;
          default:
            updateFields[key] = userData[key];
            break;
        }
      }
    });

    // Validasi apakah ada field yang akan diupdate
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada data valid untuk diupdate",
      });
    }

    // Siapkan query dinamis
    const setClauses = Object.keys(updateFields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updateFields), id];

    const query = `
    UPDATE pending 
    SET ${setClauses}
    WHERE id = ?
  `;

    try {
      const [result] = await promiseDb.execute(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Pengguna tidak ditemukan",
        });
      }

      // Ambil data pengguna terbaru dengan field terbatas
      const [updatedUser] = await promiseDb.execute(
        `SELECT 
        id, msidn, full_name, email, nik, 
        activate_date, tgl_lahir, alamat, 
        kota_kabupaten, provinsi
      FROM pending 
      WHERE id = ?`,
        [id]
      );

      res.status(200).json({
        success: true,
        message: "Data pengguna berhasil diperbarui",
        data: updatedUser[0],
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Gagal memperbarui data pengguna",
      });
    }
  },

  // editCustomer: async (req, res) => {
  //   console.log("Received ID:", req.params.id);
  //   console.log("Received Body:", JSON.stringify(req.body, null, 2));

  //   const { id } = req.params;

  //   if (!id) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "ID pelanggan diperlukan",
  //     });
  //   }

  //   // Destructure dengan default values dan konversi
  //   const {
  //     msidn = "",
  //     full_name = "",
  //     cls = "",
  //     bonus = 0,
  //     nik = "",
  //     kk_number = "",
  //     package_id = "",
  //     activate_date = null,
  //     // tambahkan semua field yang diperlukan
  //   } = req.body;

  //   const sql = `
  //       UPDATE pending
  //       SET
  //           msidn = ?,
  //           full_name = ?,
  //           cls = ?,
  //           bonus = ?,
  //           nik = ?,
  //           kk_number = ?,
  //           package_id = ?,
  //           activate_date = ?
  //           tempat_lahir = ?,
  //            tgl_lahir = ?,
  //            alamat = ?,
  //            no_rumah = ?,
  //            rt = ?,
  //            rw = ?,
  //            desa_kelurahan = ?,
  //            kecamatan = ?,
  //            kota_kabupaten = ?,
  //            provinsi = ?,
  //            alamat_domisili = ?,
  //            kota_domisili = ?,
  //            phone_2 = ?,
  //            email = ?,
  //            whatsapp = ?
  //       WHERE id = ?
  //   `;

  //   try {
  //     const [results] = await promiseDb.execute(sql, [
  //       msidn,
  //       full_name,
  //       cls,
  //       bonus,
  //       nik,
  //       kk_number,
  //       package_id,
  //       activate_date,
  //       id,
  //     ]);

  //     if (results.affectedRows > 0) {
  //       return res.status(200).json({
  //         success: true,
  //         message: "Data pelanggan berhasil diperbarui",
  //         updatedRows: results.affectedRows,
  //       });
  //     } else {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Pelanggan dengan ID tersebut tidak ditemukan",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Detailed Error:", error);
  //     console.error("Error Message:", error.message);
  //     console.error("Error SQL:", error.sqlMessage);
  //     console.error("Error Code:", error.code);

  //     return res.status(500).json({
  //       success: false,
  //       message: "Gagal memperbarui data pelanggan",
  //       errorDetail: error.message,
  //       errorCode: error.code,
  //     });
  //   }
  // },

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

  getAllActivated: async (req, res) => {
    try {
      const sql = `SELECT * FROM costumers WHERE status = 'activated'`;
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
