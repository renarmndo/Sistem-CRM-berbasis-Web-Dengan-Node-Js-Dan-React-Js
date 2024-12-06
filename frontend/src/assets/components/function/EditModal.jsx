import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditModal = ({ isEditOpen, closeEdit }) => {
  const navigate = useNavigate();
  const [msidn, setMsidn] = useState("");
  const [full_name, setFullName] = useState("");
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
  const [diperlukandDeposit, setDiperlukandDeposit] = useState(false);
  const [tambahan5GB, setTambahan5GB] = useState(false);
  const [autoPayment, setAutoPayment] = useState(false);
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [costumer, setCostumers] = useState([]);
  const [selectedCostumer, setSelectedCustomers] = useState(null);

  const [formData, setFormData] = useState({
    msidn: "",
    full_name: "",
    cls: "",
    bonus: "",
    nik: "",
    kk_number: "",
    package_id: 1,
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
  });
  // Edit State

  const handleCustomerSelect = (costumer) => {
    setFormData({
      id: costumer.id,
      msidn: costumer.msidn,
      email: costumer.email,
      alamat: costumer.alamat,
      full_name: costumer.full_name,
      cls: costumer.cls,
      bonus: costumer.bonus,
      nik: costumer.nik,
      kk_number: costumer.kk_number,
      package_id: costumer.package_id,
      activate_date: costumer.activate_date,
      tempat_lahir: costumer.tempat_lahir,
      tgl_lahir: costumer.tgl_lahir,
      no_rumah: costumer.no_rumah,
      rt: costumer.rt,
      rw: costumer.rw,
      desa_kelurahan: costumer.desa_kelurahan,
      kecamatan: costumer.kecamatan,
      kota_kabupaten: costumer.kota_kabupaten,
      provinsi: costumer.provinsi,
      alamat_domisili: costumer.alamat_domisili,
      kota_domisili: costumer.kota_domisili,
      phone_2: costumer.phone_2,
      whatsapp: costumer.whatsapp,
      status: costumer.status,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/agent/all-costumer"
        );
        setCostumers(response.data.data);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check if ID exists before fetching
    if (id) {
      const fetchCustomerData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/agent/customer/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Full Error:", error);
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text:
              error.response?.data?.msg ||
              "Tidak dapat mengambil data customer",
          });
        }
      };

      fetchCustomerData();
    } else {
      console.error("No customer ID provided");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/agent/edit-costumer/${id}`,
        { ...formData, id }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.msg,
      }).then(() => navigate("/data-customers"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.msg || "Terjadi kesalahan",
      });
    }
  };

  // Get All Data
  useEffect(() => {
    const getDataCostumers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/agent/all-costumer"
        );
        setCostumers(response.data.data);
        console.log("Ini Hasilnya Guys", response);
      } catch (error) {
        console.log(error);
      }
    };
    getDataCostumers();
  }, []);

  useEffect(() => {
    const getDataById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/costumers/${id}`
        );
        setMsidn(response.data.msidn);
        setFullName(response.data.full_name);
        setCls(response.data.cls);
        setBonus(response.data.bonus);
        setNik(response.data.nik);
        setKkNumber(response.data.kk_number);
        setPackageId(response.data.package_id);
        setActivateDate(response.data.activate_date);
        setTempatLahir(response.data.tempat_lahir);
        setTglLahir(response.data.tgl_lahir);
        setAlamat(response.data.alamat);
        setNoRumah(response.data.no_rumah);
        setRt(response.data.rt);
        setRw(response.data.rw);
        setDesaKelurahan(response.data.desa_kelurahan);
        setKecamatan(response.data.kecamatan);
        setKotaKabupaten(response.data.kota_kabupaten);
        setProvinsi(response.data.provinsi);
        setAlamatDomisili(response.data.alamat_domisili);
        setKotaDomisili(response.data.kota_domisili);
        setPhone2(response.data.phone_2);
        setEmail(response.data.email);
        setWhatsapp(response.data.whatsapp);
        setStatus(response.data.status);
        setDiperlukandDeposit(response.data.diperlukandDeposit);
        setTambahan5GB(response.data.tambahan5GB);
        setAutoPayment(response.data.autoPayment);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error);
        }
      }
    };
    getDataById();
  }, [id]);

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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );

  useEffect(() => {
    if (selectedCostumer) {
      handleCustomerSelect(selectedCostumer);
    }
  }, [selectedCostumer]);

  return (
    <Modal
      isOpen={isEditOpen}
      onClick={() => handleCustomerSelect(selectedCostumer)}
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
                  placeholder="Insert"
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
                <label htmlFor="desa_kelurahan" className="block text-gray-700">
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
  );
};

export default EditModal;
