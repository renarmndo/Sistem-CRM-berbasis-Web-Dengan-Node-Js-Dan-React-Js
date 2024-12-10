const express = require("express");
const ActivatorController = require("../controllers/activatorController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/activate", authMiddleware, ActivatorController.activatorCostumer);

router.post("/activated", ActivatorController.approveCostumer);

module.exports = router;
