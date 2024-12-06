const validateCustomerData = (data) => {
  const errors = [];

  // Cek kelengkapan data yang wajib diisi
  if (!data.msidn || data.msidn.trim() === "")
    errors.push("Nomor MSIDN wajib diisi.");
  if (!data.full_name || data.full_name.trim() === "")
    errors.push("Nama lengkap wajib diisi.");
  if (!data.nik || data.nik.trim() === "") errors.push("NIK wajib diisi.");
  if (!data.kk_number || data.kk_number.trim() === "")
    errors.push("Nomor KK wajib diisi.");
  if (!data.package_id) errors.push("Paket data wajib dipilih.");
  if (!data.activate_date) errors.push("Tanggal aktif kartu wajib diisi.");
  if (!data.tempat_lahir || data.tempat_lahir.trim() === "")
    errors.push("Tempat lahir wajib diisi.");
  if (!data.tgl_lahir) errors.push("Tanggal lahir wajib diisi.");
  if (!data.alamat || data.alamat.trim() === "")
    errors.push("Alamat wajib diisi.");
  if (!data.provinsi || data.provinsi.trim() === "")
    errors.push("Provinsi wajib diisi.");
  if (!data.kota_kabupaten || data.kota_kabupaten.trim() === "")
    errors.push("Kota/Kabupaten wajib diisi.");
  if (!data.desa_kelurahan || data.desa_kelurahan.trim() === "")
    errors.push("Desa/Kelurahan wajib diisi.");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.push("Email tidak valid atau belum diisi.");

  // Kembalikan hasil validasi
  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateCustomerData };
