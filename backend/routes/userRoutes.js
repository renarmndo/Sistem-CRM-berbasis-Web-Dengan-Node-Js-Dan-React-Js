const express = require("express");
const {
  getUserById,
  getCostumersById,
  getUsers,
  deleteUser,
  register,
  createPackage,
  updatePackage,
  deletePackage,
  getPackages,
} = require("../controllers/allController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/users/:id", getUserById);
router.get("/costumers/:id", getCostumersById);
router.get("/users", getUsers);
router.delete("/users/:user_id", deleteUser);
router.post("/register", register);
router.get("/packages", getPackages);
router.post("/packages/create", createPackage);
router.delete("/packages/:id", deletePackage);

module.exports = router;
