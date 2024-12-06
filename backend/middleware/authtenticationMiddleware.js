const bcrypt = require("bcrypt");
const db = require("../config/database"); // Sesuaikan dengan pengaturan koneksi database Anda

// Fungsi registrasi pengguna
const register = async (req, res) => {
  try {
    const { username, password, email, nama_user, role } = req.body;

    // Validasi input
    if (!username || !password || !email || !nama_user || !role) {
      return res.status(400).json({ msg: "Semua data wajib diisi!" });
    }

    // Validasi role yang diizinkan
    if (role !== "agent" && role !== "team_fu" && role !== "screener") {
      return res
        .status(400)
        .json({ msg: "Role hanya boleh agent, team_fu, atau screener!" });
    }

    // Pastikan yang mendaftarkan adalah leader
    console.log("User role yang mendaftarkan:", req.user.role); // Debugging
    if (req.user.role !== "leader") {
      return res.status(403).json({
        msg: "Akses ditolak, hanya leader yang bisa mendaftarkan pengguna.",
      });
    }

    // Periksa apakah username sudah terdaftar
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    const [results] = await db.query(checkUserQuery, [username]);

    if (results.length > 0) {
      return res.status(400).json({ msg: "Username sudah digunakan!" });
    }

    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru
    const insertUserQuery =
      "INSERT INTO users (username, password, email, nama_user, role) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(insertUserQuery, [
      username,
      hashedPassword,
      email,
      nama_user,
      role,
    ]);

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
    console.error("Register user error:", error.stack); // Menambahkan stack error untuk debug yang lebih mudah
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan server", error: error.message });
  }
};

module.exports = { register };
