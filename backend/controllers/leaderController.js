const bcrypt = require("bcrypt");
const path = require("path");
const { db } = require("../config/database");
const { dataToCsv } = require("../utils/dataToCsv");
const { promiseDb } = require("../config/database");
// const { all } = require("../routes/authRoutes");

const leaderController = {
  register: async (req, res) => {
    try {
      // Debug: Log body request
      // console.log("Request body:", req.body);
      const { username, password, email, nama_user, role, leader_id } =
        req.body;

      // Validasi input
      if (
        !username ||
        !password ||
        !email ||
        !nama_user ||
        !role ||
        !leader_id
      ) {
        return res.status(400).json({ msg: "Semua data wajib diisi!" });
      }

      // Validasi role yang diizinkan
      const allowedRoles = [
        "agent",
        "team_fu",
        "screener",
        "activator",
        "leader",
      ];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          msg: "Role hanya boleh diisi agent, team_fu, screener, activator, leader",
        });
      }

      // Pastikan hanya leader yang dapat mendaftarkan
      if (req.user.role !== "leader") {
        return res.status(403).json({
          msg: "Akses ditolak, hanya leader yang dapat mendaftarkan pengguna.",
        });
      }

      // Periksa apakah username sudah terdaftar
      const checkUserQuery = "SELECT * FROM users WHERE username = ?";
      const [existingUser] = await promiseDb.execute(checkUserQuery, [
        username,
      ]);

      if (existingUser.length > 0) {
        return res.status(400).json({ msg: "Username sudah digunakan!" });
      }

      // Hash password sebelum menyimpan
      const hashedPassword = await bcrypt.hash(password, 10);

      // Query untuk menyimpan pengguna baru
      const insertUserQuery = `
      INSERT INTO users (username, password, email, nama_user, role, leader_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
      const [result] = await promiseDb.execute(insertUserQuery, [
        username,
        hashedPassword,
        email,
        nama_user,
        role,
        leader_id,
      ]);

      // Respons berhasil
      res.status(201).json({
        msg: "Pengguna baru berhasil didaftarkan",
        data: {
          id: result.insertId,
          username,
          email,
          nama_user,
          role,
          leader_id,
        },
      });
    } catch (error) {
      console.error("Register user error:", error.stack);
      res
        .status(500)
        .json({ msg: "Terjadi kesalahan server", error: error.message });
    }
  },

  // Get all users under leader
  // getUsers: async (req, res) => {
  //   try {
  //     // const leader_id = req.user.id;

  //     const [users] = await promiseDb.execute("SELECT * FROM users");
  //     console.log(users);

  //     // Pastikan hanya leader yang dapat mendaftarkan
  //     if (req.user.role !== "leader") {
  //       return res.status(403).json({
  //         msg: "Akses ditolak, hanya leader yang dapat mendaftarkan pengguna.",
  //       });
  //     }

  //     res.status(200).json({
  //       msg: "Data users berhasil diambil",
  //       data: users,
  //     });
  //   } catch (error) {
  //     console.error("Get users error:", error);
  //     res.status(500).json({
  //       msg: "Terjadi kesalahan saat mengambil data users",
  //       error: error.message,
  //     });
  //   }
  // },

  // getUsers: async (req, res) => {
  //   try {
  //     console.log("User  Info:", req.user); // Log informasi pengguna

  //     // Pastikan hanya leader yang dapat mendaftarkan
  //     if (req.user.role !== "leader") {
  //       return res.status(403).json({
  //         msg: "Akses ditolak, hanya leader yang dapat mendaftarkan pengguna.",
  //       });
  //     }

  //     const [users] = await promiseDb.execute("SELECT * FROM users");
  //     console.log("Users Data:", users); // Log data pengguna

  //     res.status(200).json({
  //       msg: "Data users berhasil diambil",
  //       data: users,
  //     });
  //   } catch (error) {
  //     console.error("Get users error:", error);
  //     res.status(500).json({
  //       msg: "Terjadi kesalahan saat mengambil data users",
  //       error: error.message,
  //     });
  //   }
  // },
  getUsers: async (req, res) => {
    try {
      const [users] = await promiseDb.execute("SELECT * FORM users");
      console.log(`Users Data : ${users}`);
      res.status(200).json({
        msg: "Data Berhasil Didapatkan",
        data: users,
      });
    } catch (error) {
      console.log(`Get Users`, error);
      res.status(500).json({
        msg: "Terjadi Kesalahan Saat memuat data users...",
        error: error.message,
      });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      // const leader_id = req.user.id;

      // Cek apakah user dimiliki oleh leader ini
      const [user] = await promiseDb.execute(
        "SELECT * FROM users WHERE id = ?",
        [user_id]
      );

      if (user.length === 0) {
        return res.status(404).json({ msg: "User tidak ditemukan!" });
      }

      await promiseDb.execute("DELETE FROM users WHERE id = ?", [user_id]);

      res.status(200).json({ msg: "User berhasil dihapus" });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({
        msg: "Terjadi kesalahan saat menghapus user",
        error: error.message,
      });
    }
  },

  // Export customer data
  exportCustomerData: async (req, res) => {
    try {
      const leader_id = req.user.id;

      // Mengambil data customer dari leader dan semua user/agent dibawahnya
      const [customers] = await db.query(
        `SELECT c.* 
         FROM costumers c 
         LEFT JOIN users u ON c.user_id = u.id 
         WHERE c.status = 'success' 
         AND (c.leader_id = ? OR u.leader_id = ?)`,
        [leader_id, leader_id]
      );

      if (!customers || customers.length === 0) {
        return res.status(404).json({
          msg: "Tidak ada data customer yang dapat diekspor",
        });
      }

      const filePath = path.join(
        __dirname,
        "../exports/costumers/costumers.csv"
      );

      await dataToCsv(customers, filePath);

      res.download(filePath, "costumers.csv", (downloadErr) => {
        if (downloadErr) {
          console.error("Error downloading customer data file:", downloadErr);
          return res.status(500).json({
            msg: "Error saat mengunduh file data customer",
          });
        }
      });
    } catch (error) {
      console.error("Export customer data error:", error);
      res.status(500).json({
        msg: "Terjadi kesalahan saat mengekspor data",
        error: error.message,
      });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const { id } = req.params; // Mengambil ID dari parameter URL
      const sql = `SELECT * FROM costumers WHERE id = ?`; // Query untuk mengambil customer berdasarkan ID
      const [customer] = await promiseDb.execute(sql, [id]); // Eksekusi query dengan parameter ID

      // Jika customer tidak ditemukan
      if (customer.length === 0) {
        return res.status(404).json({
          msg: "Customer tidak ditemukan",
        });
      }

      // Jika customer ditemukan
      return res.status(200).json({
        msg: "Data customer berhasil didapatkan",
        data: customer[0], // Mengembalikan objek customer pertama (karena hasilnya dalam array)
      });
    } catch (error) {
      console.log("Gagal mendapatkan data customer:", error);
      return res.status(500).json({
        msg: "Terjadi kesalahan saat mendapatkan data customer",
        error: error.message,
      });
    }
  },

  // Add paket data
  createPackage: async (req, res) => {
    try {
      const { name, data_size, price } = req.body;
      const result = await promiseDb.execute(
        "INSERT INTO package (name,data_size,price)VALUES(?,?,?)",
        [name, data_size, price]
      );
      res.status(201).json({
        msg: "Data package berhasil ditambahkan",
        data: {
          id: result.insertId,
          name,
          data_size,
          price,
        },
      });
    } catch (error) {
      console.log(`Create Package Error: ${error.message}`);
      res.status(500).json({
        msg: "Terjadi kesalahan saat menambahkan data ",
        error: error.message,
      });
    }
  },

  // update package
  updatePackage: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, data_size, price } = req.body;
      const [result] = await promiseDb.execute(
        "UPDATE package SET name = ?,data_size = ?,price = ?,WHERE id = ?",
        [name, data_size, price, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({
          msg: "Data package tidak ditemukan",
        });
      }
      res.status(200).json({
        msg: "Data package berhasil diperbarui",
        data: {
          id,
          name,
          data_size,
          price,
        },
      });
    } catch (error) {
      console.log(`Update data package error`, error);
      res.status(500).json({
        msg: "Terjadi kesalahan saat memperbarui data",
        error: error.message,
      });
    }
  },

  // delete
  deletePackage: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await promiseDb.execute(
        "DELETE * FROM package WHERE id = ?",
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({
          msg: "Data package tidak ditemukan",
        });
      }
      res.status(200).json({
        msg: "Data package Berhasil Dihapus",
      });
    } catch (error) {
      console.log("Delete package error", error);
      res.status(500).json({
        msg: "Terjadi Kesalahan Saat menghapus Data",
        error: error.message,
      });
    }
  },

  getPackages: async (req, res) => {
    try {
      // Ambil token dari header Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          msg: "Token tidak ditemukan atau tidak valid",
        });
      }

      const token = authHeader.split(" ")[1];
      const secretKey = process.env.JWT_TOKEN; // Ganti dengan secret key JWT Anda

      // Verifikasi token
      const decoded = jwt.verify(token, secretKey);

      // Ambil `leader_id` dari token jika Anda perlu memfilter berdasarkan leader_id
      // const leader_id = ; // Pastikan Anda mendapatkan `userId` atau ID yang relevan dari token

      // Perbaiki kesalahan pada query SQL
      const [packages] = await promiseDb.execute(
        "SELECT * FROM package" // Perbaikan: "FORM" -> "FROM", hapus WHERE clause jika ingin mengambil semua paket
      );

      res.status(200).json({
        msg: "Data package berhasil didapatkan",
        data: packages,
      });
    } catch (error) {
      console.error("Data gagal didapatkan", error);

      // Tangani error JWT yang spesifik
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          msg: "Token tidak valid",
        });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          msg: "Token sudah kadaluarsa",
        });
      }

      res.status(500).json({
        msg: "Terjadi Kesalahan saat memuat data",
        error: error.message,
      });
    }
  },
};

module.exports = leaderController;
