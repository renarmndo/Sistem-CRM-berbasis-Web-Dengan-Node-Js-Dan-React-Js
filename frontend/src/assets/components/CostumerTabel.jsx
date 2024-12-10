import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  // ChevronLeft,
  // ChevronRight,
  Search,
  Calendar,
} from "lucide-react";
// import { format } from "date-fns";
import axios from "axios";
import "../css/style.css";
import Modal from "react-modal";
import Swal from "sweetalert2";
import DashboardEdit from "./function/DashboardEdit";

const CostumerTabel = ({ data = [] }) => {
  // const [isModa, setEditOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [customers, setCustomers] = useState([]); // State untuk menyimpan data pelanggan
  const [result, setResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [full_name, setFullName] = useState("");
  const [msidn, setMsidn] = useState("");
  const [cls, setCls] = useState("");
  const [bonus, setBonus] = useState(0);
  const [nik, setNik] = useState("");
  const [kk_number, setKkNumber] = useState("");
  const [package_id, setPackageId] = useState(""); // Default value can be changed
  const [activate_date, setActivateDate] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_rumah, setNoRumah] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [desa_kelurahan, setDesaKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota_kabupaten, setKotaKabupaten] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [alamat_domisili, setAlamatDomisili] = useState("");
  const [kota_domisili, setKotaDomisili] = useState("");
  const [phone_2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState("Pending");
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
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [serverError, setServerError] = useState(null);
  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  const openEditModal = (costumer) => {
    setSelectedCustomerId(costumer.id);
    setCustomerData(costumer);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuccess = (updatedData) => {
    // Lakukan sesuatu setelah update berhasil, misalnya refresh data
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // Fungsi untuk membuka dan menutup modal
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  // edit data

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      // Format: YYYY-MM-DD
      const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(
        2,
        "0"
      )}-${String(selectedDay).padStart(2, "0")}`;
      setTglLahir(formattedDate); // Update tglLahir dengan tanggal yang diformat
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  const openModal = () => {
    setIsOpen(true);
  };
  console.log("Customer Data:", formData);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openEdit = (id) => {
    setCustomerId(id);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setCustomerId(null);
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/agent/all-costumer"
      );
      // Specifically use response.data.data
      setResult(response.data.data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setResult([]);
    }
  };

  const deleteData = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/agent/costumer/${id}`);

        // Perbarui state dengan menghilangkan data yang dihapus
        // Safely filter out deleted item
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== id)
        );

        Swal.fire({
          title: "Sukses!",
          text: "Data berhasil dihapus.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

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

  // Membuat array untuk tahun (1900 hingga tahun saat ini)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // Format otomatis: "YYYY-MM-DD"
    setActivateDate(selectedDate); // Simpan tanggal yang dipilih
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/agent/add-costumer",
        {
          msidn: msidn || null,
          full_name: full_name || null,
          cls: cls || null,
          bonus: bonus || null,
          nik: nik || null,
          kk_number: kk_number || null,
          package_id: package_id || 1,
          activate_date: activate_date || null,
          tempat_lahir: tempat_lahir || null,
          tgl_lahir: tgl_lahir || null,
          alamat: alamat || null,
          no_rumah: no_rumah || null,
          rt: rt || null,
          rw: rw || null,
          desa_kelurahan: desa_kelurahan || null,
          kecamatan: kecamatan || null,
          kota_kabupaten: kota_kabupaten || null,
          provinsi: provinsi || null,
          alamat_domisili: alamat_domisili || null,
          kota_domisili: kota_domisili || null,
          phone_2: phone_2 || null,
          email: email || null,
          whatsapp: whatsapp || null,
          status: status || "Pending",
        }
      );
      // Immediately update state with new data
      setResult((prevResult) => [...prevResult, response.data.data[0]]);

      // Close modal and reset form
      closeModal();

      Swal.fire({
        title: "Sukses!",
        text: "Data berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
      });
      // setMsg("Data berhasil ditambahkan."); // Atau cara lain untuk menampilkan pesan sukses
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.response,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/agent/all-costumer"
        ); // Ganti dengan URL API yang sesuai
        // console.log(response.data);\
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomers();
  }, []); // Memanggil API hanya sekali saat komponen pertama kali dirender

  useEffect(() => {
    getCustomers(); // Memanggil fungsi untuk mengambil data pelanggan
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = useMemo(() => {
    return data.filter((customer) =>
      customer.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today); // Mengatur tanggal yang terpilih
  }, []);

  // Packages
  // State untuk menyimpan paket yang dipilih
  const [packages, setPackages] = useState([]); // State untuk menyimpan data paket

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

  useEffect(() => {
    // Misalnya, mendapatkan tanggal aktif dari API atau backend
    const fetchedDate = "2024-12-14T17:00:00.000Z"; // Contoh data yang diterima dari server

    // Format untuk hanya mengambil tanggal tanpa waktu
    const formattedDate = new Date(fetchedDate).toISOString().split("T")[0]; // "2024-12-14"

    setActivateDate(formattedDate); // Set tanggal yang diformat ke state
  }, []);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="w-full text-2xl font-bold text-blue-800 text-center">
          Tabel Data Costumer
        </h1>
        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {serverError}
          </div>
        )}
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
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Add Customer Button */}
          <button
            onClick={() => openModal(true)}
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
                  Add New Customer
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700">Msisdn</label>
                      <input
                        type="text"
                        placeholder="Insert Msisdn"
                        value={msidn}
                        onChange={(e) => setMsidn(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">MF Package</label>
                      <select
                        value={package_id}
                        onChange={(e) => setPackageId(e.target.value)}
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
                        placeholder="Insert CLS"
                        value={cls}
                        onChange={(e) => setCls(e.target.value)}
                        className="w-full border border-gray-900 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Apresiasi Bonus
                      </label>
                      <select
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
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
                        value={full_name}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Insert Name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">NIK</label>
                      <input
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="Insert NIK"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="block text-gray-700">
                        Nomor KK
                      </label>
                      <input
                        type="text"
                        placeholder="Insert Nomor KK"
                        value={kk_number}
                        onChange={(e) => setKkNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="tgl_aktif">Tgl Aktif</label>
                      <input
                        type="date"
                        value={activate_date}
                        onChange={handleDateChange}
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
                        value={tempat_lahir}
                        onChange={(e) => setTempatLahir(e.target.value)}
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
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
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
                        value={no_rumah}
                        onChange={(e) => setNoRumah(e.target.value)}
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
                          value={rt}
                          onChange={(e) => setRt(e.target.value)}
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
                          value={rw}
                          onChange={(e) => setRw(e.target.value)}
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
                        value={desa_kelurahan}
                        onChange={(e) => setDesaKelurahan(e.target.value)}
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
                        value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
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
                        value={kota_kabupaten}
                        onChange={(e) => setKotaKabupaten(e.target.value)}
                        placeholder="Insert City"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Provinsi</label>
                      <input
                        type="text"
                        value={provinsi}
                        onChange={(e) => setProvinsi(e.target.value)}
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
                        placeholder="Insert Address"
                        value={alamat_domisili}
                        onChange={(e) => setAlamatDomisili(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="block text-gray-700">
                        Kota Domisili
                      </label>
                      <input
                        type="text"
                        value={kota_domisili}
                        placeholder="Insert City"
                        onChange={(e) => setKotaDomisili(e.target.value)}
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
                        value={phone_2}
                        placeholder="Insert Phone 2"
                        onChange={(e) => setPhone2(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="block text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        placeholder="Insert Email"
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={whatsapp}
                        placeholder="Insert WhatsApp"
                        onChange={(e) => setWhatsapp(e.target.value)}
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(customer)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => deleteData(customer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
      {/* Modal Add costumer */}
      <Modal
        isOpen={isEditOpen}
        onRequestClose={closeEdit}
        className="fixed inset-0 z-50 overflow-y-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <div className="w-full p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
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
                    htmlFor="msidn"
                    name="package_id"
                    id="package_id"
                    value={formData.package_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option>-- Choose MF Package --</option>
                    {/* Add options dynamically here */}
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
                    value={formData.activate_date}
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
                  <label className="block text-gray-700">Tanggal Lahir</label>
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
                  <label
                    htmlFor="desa_kelurahan"
                    className="block text-gray-700"
                  >
                    Desa/kelurahan
                  </label>
                  <input
                    type="text"
                    name="desa_kelurahan"
                    value={formData.esa_kelurahan}
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
                  <label
                    htmlFor="kota_kabupaten"
                    className="block text-gray-700"
                  >
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
                  <label
                    htmlFor="kota_domisili"
                    className="block text-gray-700"
                  >
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
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={closeEdit}
                  className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {isEditModalOpen && (
        <div className="modal">
          <DashboardEdit
            customerId={selectedCustomerId}
            initialData={customerData}
            onUpdateSuccess={handleUpdateSuccess}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default CostumerTabel;
