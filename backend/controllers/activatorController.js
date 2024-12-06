const Costumer = require("../models/costumerModel");

const ActivatorController = {
  activatorCostumer: (req, res) => {
    const { costumerId } = req.body;
    res.send("Costumer Berhasil Diaktifkan");
  },
};

module.exports = ActivatorController;
