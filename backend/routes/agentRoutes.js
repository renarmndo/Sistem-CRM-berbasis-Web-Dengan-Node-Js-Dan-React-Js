const express = require("express");
const agentController = require("../controllers/agentController");

const router = express.Router();

router.post("/add-costumer", agentController.addCostumer);
router.put("/edit-costumer", agentController.editCustomer);
router.get("/all-costumer", agentController.getAllCostumer);
router.delete("/costumer/:id", agentController.deleteCustomer);
router.get("/costumer/:id", agentController.getCustomerById);
module.exports = router;
