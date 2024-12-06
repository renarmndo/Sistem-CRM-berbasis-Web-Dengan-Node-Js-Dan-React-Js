const Costumer = require("../models/costumerModel"); // Model untuk tabel costumers
const Pending = require("../models/pendingModel.js"); // Model untuk tabel data_pending

const ScreenerController = {
  // Memvalidasi data pelanggan
  validateCostumer: async (req, res) => {
    try {
      const { costumerId, isValid, missingFields, notes } = req.body;

      // Pastikan costumerId dikirim
      if (!costumerId) {
        return res.status(400).json({ msg: "ID pelanggan wajib diisi!" });
      }

      // Cari data pelanggan berdasarkan ID
      const costumer = await Costumer.findOne({ where: { id: costumerId } });

      if (!costumer) {
        return res.status(404).json({ msg: "Pelanggan tidak ditemukan!" });
      }

      if (isValid) {
        // Jika data valid, pindahkan ke tahap berikutnya (Activator)
        await Costumer.update(
          {
            status: "validated",
            current_stage: "activator", // Update tahap ke activator
          },
          { where: { id: costumerId } }
        );

        return res.status(200).json({
          msg: "Data pelanggan telah divalidasi dan dikirim ke Activator.",
        });
      } else {
        // Jika data tidak valid, masukkan ke tabel pending
        if (!missingFields || missingFields.length === 0) {
          return res
            .status(400)
            .json({ msg: "Field yang kurang harus disertakan!" });
        }

        await Pending.create({
          costumer_id: costumerId,
          missing_field: JSON.stringify(missingFields), // Simpan field yang kurang
          notes, // Catatan tambahan
        });

        // Update status pelanggan menjadi pending
        await Costumer.update(
          {
            status: "pending",
            current_stage: "team_fu", // Update tahap ke Team FU
          },
          { where: { id: costumerId } }
        );

        return res.status(200).json({
          msg: "Data pelanggan tidak lengkap, dikirim ke Team FU untuk tindak lanjut.",
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ msg: "Terjadi kesalahan server.", error: error.message });
    }
  },

  // Mendapatkan daftar pelanggan di tahap Screener
  getAllCostumers: async (req, res) => {
    try {
      const costumers = await Costumer.findAll({
        where: { current_stage: "screener" },
      });

      res
        .status(200)
        .json({ msg: "Daftar pelanggan untuk validasi.", data: costumers });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ msg: "Terjadi kesalahan server.", error: error.message });
    }
  },
};

module.exports = ScreenerController;
