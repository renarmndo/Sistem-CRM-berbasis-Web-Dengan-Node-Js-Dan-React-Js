import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const DashboardEdit = ({
  customerId,
  initialData,
  onUpdateSuccess,
  onClose,
}) => {
  //   const [formData, setFormData] = useState(initialData);
  const [packages, setPackages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    msidn: "",
    full_name: "",
    cls: "",
    bonus: "",
    nik: "",
    kk_number: "",
    package_id: "",
    activate_date: "",
    tempat_lahir: "",
    tgl_lahir: "",
    alamat: "",
    no_rumah: "",
    rt: "",
    rw: "",
    desa_kelurahan: "",
    kecamatan: "",
    kota_kabupaten: "",
    provinsi: "",
    alamat_domisili: "",
    kota_domisili: "",
    phone_2: "",
    email: "",
    whatsapp: "",
    ...initialData,
  });

  useEffect(() => {
    // Fetch customer data by ID
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/agent/costumer/${customerId}`
        );
        setFormData(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Tidak dapat mengambil data pelanggan",
        });
        console.error("Error fetching customer data:", error);
      }
    };

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Efek untuk memperbarui state jika initialData berubah
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
      });
    }
  }, [initialData]);

  //
  // Handler submit form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   setLoading(true);
  //   try {
  //     const response = await axios.put(
  //       ` http://localhost:5000/api/agent/edit-costumer/${customerId}`,
  //       formData
  //     );

  //     if (response.data.success) {
  //       onUpdateSuccess(response.data.data);
  //       alert("Data pengguna berhasil diperbarui");
  //     }
  //   } catch (error) {
  //     console.error("Gagal update pengguna:", error);
  //     alert(error.response?.data?.message || "Gagal mengupdate pengguna");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Buat salinan data untuk diolah
    const processedData = { ...formData };

    // Konversi tanggal ke format MySQL (YYYY-MM-DD)
    if (processedData.activate_date) {
      processedData.activate_date = new Date(processedData.activate_date)
        .toISOString()
        .split("T")[0];
    }

    if (processedData.tgl_lahir) {
      processedData.tgl_lahir = new Date(processedData.tgl_lahir)
        .toISOString()
        .split("T")[0];
    }

    try {
      // Kirim request PUT ke backend
      const response = await axios.put(
        `http://localhost:5000/api/agent/edit-costumer/${customerId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Tampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diupdate",
        confirmButtonText: "OK",
      });

      // Optional: Lakukan sesuatu setelah berhasil (misalnya refresh data atau navigasi)
      console.log("Update berhasil:", response.data);
      onClose();
    } catch (error) {
      // Tangani error
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: error.response?.data?.message || "Gagal mengupdate data",
        confirmButtonText: "Tutup",
      });

      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    // Ambil data paket dari API
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/packages");
        setPackages(response.data.data); // Update state dengan data paket
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages(); // Panggil fungsi untuk mengambil data saat komponen dimuat
  }, []);

  // const handleClose = () => {
  //   // console.log("Initial Data:", initialData); // Debug log
  //   // console.log("Current Form Data:", formData); // Debug log

  //   const isDataChanged =
  //     JSON.stringify(initialData) !== JSON.stringify(formData);

  //   if (isDataChanged) {
  //     Swal.fire({
  //       title: "Batalkan Perubahan?",
  //       text: "Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Ya, Keluar",
  //       cancelButtonText: "Batal",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         console.log("Confirmed to close with changes"); // Debug log
  //         if (onClose) {
  //           onClose();
  //         }
  //       }
  //     });
  //   } else {
  //     console.log("No changes detected, closing"); // Debug log
  //     if (onClose) {
  //       onClose();
  //     }
  //   }
  // };

  const handleClose = () => {
    const isDataChanged =
      JSON.stringify(initialData) !== JSON.stringify(formData);

    if (isDataChanged) {
      Swal.fire({
        title: "Batalkan Perubahan?",
        text: "Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Keluar",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          // Pastikan onClose adalah fungsi yang benar-benar menutup modal
          if (typeof onClose === "function") {
            onClose();
          }
        }
      });
    } else {
      // Jika tidak ada perubahan, langsung tutup
      if (typeof onClose === "function") {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="w-full p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-blue-600 text-2xl font-bold mb-6 text-center">
            Edit Data Costumers
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label htmlFor="msidn" className="block text-gray-700">
                  Msisdn
                </label>
                <input
                  htmlFor="msidn"
                  name="msidn"
                  id="msidn"
                  type="text"
                  placeholder="Insert Msisdn"
                  value={formData.msidn}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700">MF Package</label>
                <select
                  value={formData.package_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      package_id: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>-- Choose MF Package --</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} {/* Tampilkan nama paket */}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cls" className="block text-gray-700">
                  CLS
                </label>
                <input
                  htmlFor="cls"
                  name="cls"
                  id="cls"
                  type="text"
                  value={formData.cls}
                  onChange={handleChange}
                  className="w-full border border-gray-900 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Apresiasi Bonus</label>
                <select
                  htmlFor="bonus"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>-- Choose Bonus --</option>
                  {/* Add options dynamically here */}
                </select>
              </div>
            </div>
            <h2 className="text-blue-500 text-lg font-bold mb-4">
              Data Customer
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  htmlFor="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700">NIK</label>
                <input
                  type="text"
                  htmlFor="nik"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  placeholder="Insert NIK"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="kk_number" className="block text-gray-700">
                  Nomor KK
                </label>
                <input
                  type="text"
                  htmlFor="kk_number"
                  name="kk_number"
                  value={formData.kk_number}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="activate_date">Tgl Aktif</label>
                <input
                  type="date"
                  htmlFor="activate_date"
                  name="activate_date"
                  value={
                    formData.activate_date &&
                    formData.activate_date.includes("T")
                      ? formData.activate_date.split("T")[0]
                      : formData.activate_date || ""
                  }
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="tempat_lahir" className="block text-gray-700">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  htmlFor="tempat_lahir"
                  name="tempat_lahir"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  placeholder="Insert Place of Birth"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="tgl_lahir">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tgl_lahir"
                  id="tgl_lahir"
                  placeholder="Insert Tanggal Lahir"
                  value={
                    formData.tgl_lahir ? formData.tgl_lahir.split("T")[0] : ""
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="alamat" className="block text-gray-700">
                  Alamat
                </label>
                <input
                  type="text"
                  htmlFor="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Jalan"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-4">
              <div>
                <label htmlFor="no_rumah" className="block text-gray-700">
                  Nomor Rumah
                </label>
                <input
                  type="text"
                  name="no_rumah"
                  value={formData.no_rumah}
                  onChange={handleChange}
                  placeholder="Insert Address"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-2">
                <div>
                  <label htmlFor="rt" className="block text-gray-700">
                    RT
                  </label>
                  <input
                    type="text"
                    name="rt"
                    value={formData.rt}
                    onChange={handleChange}
                    placeholder="RT"
                    className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="rw" className="block text-gray-700">
                    RW
                  </label>
                  <input
                    type="text"
                    name="rw"
                    value={formData.rw}
                    onChange={handleChange}
                    placeholder="RW"
                    className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="desa_kelurahan" className="block text-gray-700">
                  Desa/kelurahan
                </label>
                <input
                  type="text"
                  name="desa_kelurahan"
                  value={formData.desa_kelurahan}
                  onChange={handleChange}
                  placeholder="Insert Desa/kelurahan"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="kecamatan" className="block text-gray-700">
                  Kecamatan
                </label>
                <input
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  placeholder="Insert Kecamatan"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="kota_kabupaten" className="block text-gray-700">
                  Kota/Kabupaten
                </label>
                <input
                  type="text"
                  name="kota_kabupaten"
                  value={formData.kota_kabupaten}
                  onChange={handleChange}
                  placeholder="Insert City"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="provinsi" className="block text-gray-700">
                  Provinsi
                </label>
                <input
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  placeholder="Insert Provinsi"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 mb-4">
              <div>
                <label
                  htmlFor="alamat_domisili"
                  className="block text-gray-700"
                >
                  Alamat/Domisili
                </label>
                <input
                  type="text"
                  name="alamat_domisili"
                  value={formData.alamat_domisili}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="kota_domisili" className="block text-gray-700">
                  Kota Domisili
                </label>
                <input
                  type="text"
                  name="kota_domisili"
                  value={formData.kota_domisili}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <div className="flex gap-2">
                  <label htmlFor="phone_2" className="block text-gray-700">
                    Phone 2
                  </label>
                  <input type="checkbox" />
                </div>
                <input
                  type="text"
                  name="phone_2"
                  value={formData.phone_2}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <div className="flex gap-2">
                  <label htmlFor="whatsapp" className="block text-gray-700">
                    WhatsApp
                  </label>
                  <input type="checkbox" />
                </div>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="">
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">Diperlukan Deposit</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">Tambah 5GB</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">Auto Payment</label>
                </div>
              </div>
            </div>
            {/* Continue with the rest of the form fields similarly */}
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Data
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardEdit;
