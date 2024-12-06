const express = require("express");
const screenerController = require("../controllers/screenerController");
const router = express.Router();

router.post("/validate", screenerController.validateCostumer);
router.get("/list", screenerController.getAllCostumers);

module.exports = router;
