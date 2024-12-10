const express = require("express");
const agentController = require("../controllers/agentController");

const router = express.Router();

router.post("/add-costumer", agentController.addCostumer);
router.put("/edit-costumer/:id", agentController.updateUser);
router.get("/all-costumer", agentController.getAllCostumer);
router.delete("/costumer/:id", agentController.deleteCustomer);
router.get("/costumer/:id", agentController.getCustomerById);
router.get("/activated", agentController.getAllActivated);

module.exports = router;
