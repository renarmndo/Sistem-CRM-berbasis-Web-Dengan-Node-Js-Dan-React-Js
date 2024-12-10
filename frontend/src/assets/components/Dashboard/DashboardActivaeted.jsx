import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  // ChevronLeft,
  // ChevronRight,
  Search,
  Calendar,
} from "lucide-react";
import Modal from "react-modal";
// import EditModal from "./function/EditModal";

const DashboardActivaeted = () => {
  const [result, setResult] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activate_date, setActivateDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    msidn: "",
    full_name: "",
    cls: "",
    bonus: 0,
    nik: "",
    kk_number: "",
    package_id: "", // Default value, bisa diubah sesuai kebutuhan
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
    status: "Pending",
    DiperlukandDeposit: false,
    Tambahan5GB: false,
    AutoPayment: false,
  });

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

  //   const filteredCustomers = useMemo(() => {
  //     return result.filter((customer) =>
  //       customer.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }, [searchTerm]);

  const getCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/agent/activated"
      );
      const customer = response.data.data[0]; // Ambil data pertama atau sesuaikan
      setResult(response.data.data || []);
      console.log(customer);

      // Atur nilai awal formData dengan data dari API
      setFormData({
        full_name: customer?.full_name || "",
        email: customer?.email || "",
        phone_2: customer?.phone_2 || "",
        whatsapp: customer?.whatsapp || "",
        alamat: customer?.alamat || "",
        no_rumah: customer?.no_rumah || "",
        rt: customer?.rt || "",
        rw: customer?.rw || "",
        desa_kelurahan: customer?.desa_kelurahan || "",
        kecamatan: customer?.kecamatan || "",
        kota_kabupaten: customer?.kota_kabupaten || "",
        provinsi: customer?.provinsi || "",
        kota_domisili: customer?.kota_domisili || "",
        alamat_domisili: customer?.alamat_domisili || "",
        msidn: customer?.msidn || "",
        cls: customer?.cls || "",
        bonus: customer?.bonus || 0,
        nik: customer?.nik || "",
        kk_number: customer?.kk_number || "",
        package_id: customer?.package_id || "",
        activate_date: customer?.activate_date || "",
        tempat_lahir: customer?.tempat_lahir || "",
        tgl_lahir: customer?.tgl_lahir || "",
        status: customer?.status || "",
      });
    } catch (error) {
      console.error("Error fetching customers:", error);
      setResult([]);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  //
  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk menyimpan data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data ke API
      console.log("Data submitted:", formData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Membuat array untuk tahun (1900 hingga tahun saat ini)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  useEffect(() => {
    // Misalnya, mendapatkan tanggal aktif dari API atau backend
    const fetchedDate = "2024-12-14T17:00:00.000Z"; // Contoh data yang diterima dari server

    // Format untuk hanya mengambil tanggal tanpa waktu
    const formattedDate = new Date(fetchedDate).toISOString().split("T")[0]; // "2024-12-14"

    setActivateDate(formattedDate); // Set tanggal yang diformat ke state
  }, []);

  //   const openModal = () => {
  //     setIsOpen(true);
  //   };
  //   console.log("Customer Data:", custom);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="w-full text-2xl font-bold text-blue-800 text-center">
          Tabel Data Costumer
        </h1>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          {/* Date Input */}
          <div className="relative">
            <input
              type="date"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              //   onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Add Customer Button */}
          <button
            // onClick={() => openModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <Plus size={20} />
            <span>Add Customer</span>
          </button>

          {/* Modal add costumer */}

          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="fixed inset-0 z-50 overflow-y-auto"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
          >
            <div className="w-full p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-blue-600 text-2xl font-bold mb-4">
                  Add Customer
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700">Msisdn</label>
                      <input
                        type="text"
                        name="msidn"
                        id="msidn"
                        value={formData.msidn}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="package_id"
                        className="block text-gray-700"
                      >
                        MF Package
                      </label>
                      <select
                        value={formData.package_id}
                        onChange={handleChange}
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
                        type="text"
                        name="cls"
                        value={formData.cls}
                        onChange={handleChange}
                        className="w-full border border-gray-900 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Apresiasi Bonus
                      </label>
                      <select
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
                      <label className="block text-gray-700">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
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
                        value={formData.nik}
                        name="nik"
                        onChange={handleChange}
                        placeholder="Insert NIK"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="kk_number"
                        className="block text-gray-700"
                      >
                        Nomor KK
                      </label>
                      <input
                        type="text"
                        name="kk_number"
                        value={formData.kk_number}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="tgl_aktif">Tgl Aktif</label>
                      <input
                        type="date"
                        name="activate_date"
                        value={formData.activate_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        name="tempat_lahir"
                        value={formData.tempat_lahir}
                        onChange={handleChange}
                        placeholder="Insert Place of Birth"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Tanggal Lahir
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Pilihan Tanggal */}
                        <select
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Tanggal</option>
                          {days.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        {/* Pilihan Bulan */}
                        <select
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Bulan</option>
                          {months.map((month, index) => (
                            <option key={index} value={index + 1}>
                              {month}
                            </option>
                          ))}
                        </select>
                        {/* Pilihan Tahun */}
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Tahun</option>{" "}
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {" "}
                              {year}{" "}
                            </option>
                          ))}{" "}
                        </select>{" "}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700">Alamat</label>
                      <input
                        type="text"
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
                      <label className="block text-gray-700">Nomor Rumah</label>
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
                      <label className="block text-gray-700">
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
                      <label
                        htmlFor="kecamatan"
                        className="block text-gray-700"
                      >
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
                      <label className="block text-gray-700">
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
                      <label className="block text-gray-700">Provinsi</label>
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
                      <label htmlFor="" className="block text-gray-700">
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
                      <label htmlFor="" className="block text-gray-700">
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
                        <label htmlFor="" className="block text-gray-700">
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
                      <label htmlFor="" className="block text-gray-700">
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
                        <label htmlFor="" className="block text-gray-700">
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
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* Modal */}
          </Modal>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="overflow-x-auto shadow-md ">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-blue-100">
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 text-sm">
                  MSIDN
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 text-sm">
                  Name
                </th>
                <th className="order border-gray-300 px-4 py-2 text-left text-gray-600 text-sm">
                  ClS
                </th>
                <th className="order border-gray-300 px-4 py-2 text-left text-gray-600 text-sm">
                  NIK
                </th>
                <th className="order border-gray-300 px-4 py-2 text-left text-gray-600 text-sm">
                  Address
                </th>
                <th className="order border-gray-300 px-4 py-2 text-left text-gray-600 text-sm">
                  Contact
                </th>
                <th className="order border-gray-300 px-4 py-2 text-left text-gray-600 text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {result
                .filter(
                  (customer) =>
                    customer.full_name &&
                    customer.full_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((customer, index) => (
                  <tr key={index} className="hover:bg-blue-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.msidn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.full_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {customer.cls}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer.nik}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {customer.alamat}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.kota_kabupaten}, {customer.provinsi}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {customer.phone_2}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-500 font-Psans">
                      {customer.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Pagination */}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing 1 to 5 of 35 entries
          </span>
          <div className="flex">
            <button className="bg-gray-300 px-3 py-1 border text-gray-600">
              Previous
            </button>
            <button className="bg-gray-300 px-3 py-1 border text-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
      {/* <EditModal
        isEditOpen={isEditOpen}
        closeEdit={closeEdit}
        costumerId={customerId}
      /> */}
      {/* Modal aDD costumer */}
    </div>
  );
};

export default DashboardActivaeted;
