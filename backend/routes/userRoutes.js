const express = require("express");
const {
  getUserById,
  getCostumersById,
  getUsers,
  deleteUser,
  register,
} = require("../controllers/allController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/users/:id", getUserById);
router.get("/costumers/:id", getCostumersById);
router.get("/users", getUsers);
router.delete("/users/:user_id", deleteUser);
router.post("/register", authMiddleware, register);

module.exports = router;
