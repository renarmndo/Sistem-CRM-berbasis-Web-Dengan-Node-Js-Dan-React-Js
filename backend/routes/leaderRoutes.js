const express = require("express");
const leaderController = require("../controllers/leaderController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
const authtentication = require("../middleware/authtenticationMiddleware");
const router = express.Router();

// Hanya leader yang bisa mengaksesnya
router.post(
  "/register",
  authMiddleware,
  checkRole("leader"),
  leaderController.register
);

router.get(
  "/users",
  authMiddleware,
  checkRole("leader"),
  leaderController.getUsers
);

router.delete(
  "/users/:user_id",
  authMiddleware,
  checkRole("leader"),
  leaderController.deleteUser
);

// Route untuk export data
router.get(
  "/export-customers",
  authMiddleware,
  checkRole("leader"),
  leaderController.exportCustomerData
);

router.get(
  "/get-customers/:id",
  authMiddleware,
  checkRole("leader"),
  leaderController.getCustomerById
);

// Package Data
// create
router.post(
  "/add-package",
  authMiddleware,
  checkRole("leader"),
  leaderController.createPackage
);

// update
router.put(
  "/packages/:id",
  authMiddleware,
  checkRole("leader"),
  leaderController.updatePackage
);

// delete
router.delete(
  "/packages/:id",
  authMiddleware,
  checkRole("leader"),
  leaderController.deletePackage
);

router.get(
  "/packages",
  authMiddleware,
  checkRole("leader"),
  leaderController.getPackages
);

module.exports = router;
