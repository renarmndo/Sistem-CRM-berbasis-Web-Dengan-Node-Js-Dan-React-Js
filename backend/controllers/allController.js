const db = require("../config/database");
const { promiseDb } = require("../config/database");
const bcrypt = require("bcrypt");

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    // Gunakan promiseDb.execute
    const [users] = await promiseDb.execute(
      "SELECT id,username,email,nama_user FROM users WHERE id = ?",
      [id]
    );

    // Jika user tidak ditemukan
    if (users.length === 0) {
      return res.status(404).json({
        msg: "Pengguna tidak ditemukan",
        data: null,
      });
    }

    // Kembalikan response JSON dengan data user
    return res.status(200).json({
      msg: "Data pengguna berhasil didapatkan",
      data: users[0],
    });
  } catch (error) {
    console.log("Gagal mendapatkan data pengguna:", error);
    return res.status(500).json({
      msg: "Terjadi kesalahan saat mendapatkan data pengguna",
      error: error.message,
    });
  }
};

const getCostumersById = async (req, res) => {
  const { id } = req.params;
  try {
    // Gunakan promiseDb.execute
    const [users] = await promiseDb.execute(
      "SELECT * FROM costumers WHERE id = ?",
      [id]
    );

    // Jika user tidak ditemukan
    if (users.length === 0) {
      return res.status(404).json({
        msg: "Pengguna tidak ditemukan",
        data: null,
      });
    }

    // Kembalikan response JSON dengan data user
    return res.status(200).json({
      msg: "Data pengguna berhasil didapatkan",
      data: users[0],
    });
  } catch (error) {
    console.log("Gagal mendapatkan data pengguna:", error);
    return res.status(500).json({
      msg: "Terjadi kesalahan saat mendapatkan data pengguna",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const [users] = await promiseDb.execute("SELECT * FROM users");
    // console.log(`Users Data : ${users}`);
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
};

// Delete Users
const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    // const leader_id = req.user.id;

    // Cek apakah user dimiliki oleh leader ini
    const [user] = await promiseDb.execute("SELECT * FROM users WHERE id = ?", [
      user_id,
    ]);

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
};
// const register = async (req, res) => {
//   try {
//     const { username, password, email, nama_user, role } = req.body;

//     // Validasi input
//     if (!username || !password || !email || !nama_user || !role) {
//       return res.status(400).json({ msg: "Semua data wajib diisi!" });
//     }

//     // Validasi role yang diizinkan
//     const allowedRoles = [
//       "agent",
//       "team_fu",
//       "screener",
//       "activator",
//       "leader",
//     ];
//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({
//         msg: "Role hanya boleh diisi agent, team_fu, screener, activator, leader",
//       });
//     }

//     // Memeriksa apakah pengguna memiliki role "leader"
//     if (role !== "leader") {
//       return res.status(403).json({
//         msg: "Akses ditolak, hanya leader yang dapat mendaftarkan pengguna.",
//       });
//     }

//     // Periksa apakah username sudah terdaftar
//     const checkUserQuery = "SELECT * FROM users WHERE username = ?";
//     const [existingUser] = await promiseDb.execute(checkUserQuery, [username]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ msg: "Username sudah digunakan!" });
//     }

//     // Hash password sebelum menyimpan
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Query untuk menyimpan pengguna baru
//     const insertUserQuery = `
//       INSERT INTO users (username, password, email, nama_user, role)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const [result] = await promiseDb.execute(insertUserQuery, [
//       username,
//       hashedPassword,
//       email,
//       nama_user,
//       role,
//     ]);

//     // Respons berhasil
//     res.status(201).json({
//       msg: "Pengguna baru berhasil didaftarkan",
//       data: {
//         id: result.insertId,
//         username,
//         email,
//         nama_user,
//         role,
//       },
//     });
//   } catch (error) {
//     console.error("Register user error:", error.stack);
//     res
//       .status(500)
//       .json({ msg: "Terjadi kesalahan server", error: error.message });
//   }
// };
const register = async (req, res) => {
  try {
    const { username, password, email, nama_user, role } = req.body;

    // Role dari token yang sudah didecode
    const tokenRole = req.user.role;

    console.log("Role dari token:", tokenRole); // Debugging

    // Validasi input
    if (!username || !password || !email || !nama_user || !role) {
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

    // Periksa jika role dari token adalah "leader"
    if (tokenRole !== "leader") {
      return res.status(403).json({
        msg: "Akses ditolak, hanya leader yang dapat mendaftarkan pengguna.",
      });
    }

    // Periksa apakah username sudah terdaftar
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    const [existingUser] = await promiseDb.execute(checkUserQuery, [username]);

    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "Username sudah digunakan!" });
    }

    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query untuk menyimpan pengguna baru
    const insertUserQuery = `
      INSERT INTO users (username, password, email, nama_user, role)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await promiseDb.execute(insertUserQuery, [
      username,
      hashedPassword,
      email,
      nama_user,
      role,
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
      },
    });
  } catch (error) {
    console.error("Register user error:", error.stack);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan server", error: error.message });
  }
};

// const register = async (req, res) => {
//   try {
//     const {
//       username,
//       password,
//       email,
//       nama_user,
//       role,
//       leader_id,
//       authenticated_user_role,
//     } = req.body;

//     // Validasi input
//     if (!username || !password || !email || !nama_user || !role || !leader_id) {
//       return res.status(400).json({ msg: "Semua data wajib diisi!" });
//     }

//     // Validasi role yang akan ditambahkan
//     const allowedRoles = [
//       "agent",
//       "team_fu",
//       "screener",
//       "activator",
//       "leader",
//     ];
//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({
//         msg: "Role yang dapat ditambahkan hanya agent, team_fu, screener, activator, atau leader",
//       });
//     }

//     // Pastikan hanya screener yang dapat menambahkan pengguna baru
//     if (authenticated_user_role !== "screener") {
//       return res.status(403).json({
//         msg: "Akses ditolak, hanya screener yang dapat menambahkan pengguna.",
//       });
//     }

//     // Periksa apakah username sudah terdaftar
//     const checkUserQuery = "SELECT * FROM users WHERE username = ?";
//     const [existingUser] = await promiseDb.execute(checkUserQuery, [username]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ msg: "Username sudah digunakan!" });
//     }

//     // Hash password sebelum menyimpan
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Query untuk menyimpan pengguna baru
//     const insertUserQuery = `
//       INSERT INTO users (username, password, email, nama_user, role, leader_id)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     const [result] = await promiseDb.execute(insertUserQuery, [
//       username,
//       hashedPassword,
//       email,
//       nama_user,
//       role,
//       leader_id,
//     ]);

//     // Respons berhasil
//     res.status(201).json({
//       msg: "Pengguna baru berhasil didaftarkan",
//       data: {
//         id: result.insertId,
//         username,
//         email,
//         nama_user,
//         role,
//         leader_id,
//       },
//     });
//   } catch (error) {
//     console.error("Register user error:", error.stack);
//     res
//       .status(500)
//       .json({ msg: "Terjadi kesalahan server", error: error.message });
//   }
// };

module.exports = {
  getUserById,
  getCostumersById,
  getUsers,
  deleteUser,
  register,
};
