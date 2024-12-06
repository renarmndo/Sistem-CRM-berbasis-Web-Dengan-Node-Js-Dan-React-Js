const jwt = require("jsonwebtoken");
require("dotenv").config();

// const authMiddleware = async (req, res, next) => {
//   try {
//     // const token = req.headers["authorization"]?.split(" ")[1];
//     const token = req.cookies.authToken;

//     if (!token) {
//       return res.status(403).json({ msg: "Token tidak ditemukan" });
//     }

//     jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
//       if (err) {
//         return res.status(403).json({
//           msg: "Token tidak Valid",
//         });
//       }
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     res.status(500).json({ msg: "Terjadi kesalahan saat memverifikasi token" });
//   }
// };

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];

//     if (!token) {
//       return res.status(403).json({ msg: "Token tidak ditemukan" });
//     }

//     jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
//       if (err) {
//         return res.status(403).json({
//           msg: "Token tidak Valid",
//         });
//       }
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     res.status(500).json({ msg: "Terjadi kesalahan saat memverifikasi token" });
//   }
// };

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ msg: "Token tidak ditemukan" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: "Token tidak valid" });
      }

      req.user = user;

      // Mengecek apakah role adalah 'leader'
      if (req.user.role !== "leader") {
        return res.status(403).json({
          msg: "Akses ditolak, hanya leader yang dapat mendaftarkan pengguna.",
        });
      }

      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat memverifikasi token" });
  }
};

module.exports = authMiddleware;
