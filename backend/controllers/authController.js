const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promiseDb } = require("../config/database");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Username dan Password harus diisi!" });
    }

    // Query untuk mencari user berdasarkan username
    const sql = "SELECT * FROM users WHERE username = ?";
    const [results] = await promiseDb.execute(sql, [username]);

    const user = results[0]; // Ambil user pertama
    if (!user) {
      return res.status(400).json({ msg: "User tidak ditemukan!" });
    }

    // Bandingkan password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Password salah!" });
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        nama_user: user.nama_user,
        role: user.role,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    // Simpan token di http only
    // When creating the token
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Kirim response dengan token
    res.status(200).json({
      msg: "Login berhasil!",
      role: user.role,
      nama_user: user.nama_user,
      token,
      user: {
        success: true,
        message: "Login Berhasil",
        role: user.role,
        nama_user: user.nama_user,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // Menghapus token yang ada di cookies (jika disimpan di cookies)
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ msg: "Logout berhasil!" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat logout", error: error.message });
  }
};

// Tambahkan fungsi register yang sesuai
// const register = async (req, res) => {
//   try {
//     const { username, password, email, nama_user, role } = req.body;

//     // Validasi input
//     if (!username || !password || !email || !nama_user) {
//       return res.status(400).json({ msg: "Semua field harus diisi!" });
//     }

//     // Cek apakah username sudah ada
//     const checkUserSql = "SELECT * FROM users WHERE username = ?";
//     const [existingUsers] = await promiseDb.execute(checkUserSql, [username]);

//     if (existingUsers.length > 0) {
//       return res.status(400).json({ msg: "Username sudah terdaftar!" });
//     }

//     // Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Insert user baru
//     const insertSql =
//       "INSERT INTO users (username, password, email, nama_user, role) VALUES (?, ?, ?, ?, ?)";
//     const [result] = await promiseDb.execute(insertSql, [
//       username,
//       hashedPassword,
//       email,
//       nama_user,
//       role || "user",
//     ]);

//     res.status(201).json({
//       msg: "Registrasi berhasil!",
//       userId: result.insertId,
//     });
//   } catch (error) {
//     console.error("Registrasi error:", error);
//     res.status(500).json({
//       msg: "Terjadi kesalahan",
//       error: error.message,
//     });
//   }
// };

module.exports = { login, logout };
