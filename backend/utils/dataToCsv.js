// utils/dataToCsv.js
const fs = require("fs");
const csv = require("fast-csv"); // atau library CSV lainnya

const dataToCsv = async (data, filePath) => {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    csv
      .write(data, { headers: true })
      .pipe(ws)
      .on("finish", resolve)
      .on("error", reject);
  });
};

module.exports = { dataToCsv };
