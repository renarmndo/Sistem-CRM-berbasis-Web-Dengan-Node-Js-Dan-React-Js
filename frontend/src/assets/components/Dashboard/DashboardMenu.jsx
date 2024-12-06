import { useEffect, useState } from "react";
import axios from "axios";
import { Info, Trash2 } from "lucide-react";
import Modal from "react-modal";

const DashboardMenu = () => {
  const [result, setResult] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCostumer, setSelectedCustomers] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    msidn: "",
    email: "",
    alamat: "",
    full_name: "",
  });

  // mengisi form ke input
  const handleCustomerSelect = (result) => {
    setFormData({
      id: result.id,
      msidn: result.msidn,
      email: result.email,
      alamat: result.alamat,
      full_name: result.full_name,
      cls: result.cls,
      bonus: result.bonus,
      nik: result.nik,
      kk_number: result.kk_number,
      package_id: result.package_id,
      activate_date: result.activate_date,
      tempat_lahir: result.tempat_lahir,
      tgl_lahir: result.tgl_lahir,
      no_rumah: result.no_rumah,
      rt: result.rt,
      rw: result.rw,
      desa_kelurahan: result.desa_kelurahan,
      kecamatan: result.kecamatan,
      kota_kabupaten: result.kota_kabupaten,
      provinsi: result.provinsi,
      alamat_domisili: result.alamat_domisili,
      kota_domisili: result.kota_domisili,
      phone_2: result.phone_2,
      whatsapp: result.whatsapp,
      status: result.status,
    });
  };

  // fungsi menutup modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCustomers(null);
  };

  // fungsi membuka modal
  const openModal = () => {
    console.log(result);
    setSelectedCustomers(result);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/agent/all-costumer"
        );
        setResult(response.data.data);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [result]);

  // handle update
  const handleUpdate = () => {
    console.log("Data updated", selectedCostumer);
    console.log(selectedCostumer);
    closeModal();
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-md shadow-md mb-6">
        <h1 className="text-xl font-bold">Dashboard Data Pending</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Need Review", count: 0, color: "yellow" },
          { label: "Pending Approval", count: 0, color: "green" },
          { label: "Waiting Feedback", count: 0, color: "blue" },
          { label: "Total Pending", count: 0, color: "red" },
        ].map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-md shadow-md text-white bg-${card.color}-500 flex flex-col items-center`}
          >
            <span className="text-3xl font-bold">{card.count}</span>
            <span className="mt-2 text-center">{card.label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white p-5 rounded-md shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm ">
              {[
                "ID",
                "Msisdn",
                "Nama",
                "Cls",
                "Nik",
                "No KK",
                "aktivasi",
                "Status",
                "action",
              ].map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-gray-600 text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center text-sm font-Psans border border-gray-400">
            {result.map((costumer) => (
              <tr
                key={costumer.id}
                onClick={() => handleCustomerSelect(costumer)}
                className="border border-gray-300"
              >
                <td className="border border-gray-300 p-2">{costumer.id}</td>
                <td className="border border-gray-300 p-2">{costumer.msidn}</td>
                <td className="border border-gray-300 p-2">
                  {costumer.full_name}
                </td>
                <td className="border border-gray-300 p-2">{costumer.cls}</td>
                <td className="border border-gray-300 p-2">{costumer.nik}</td>
                <td className="border border-gray-300 p-2">
                  {costumer.kk_number}
                </td>
                <td className="border border-gray-300 p-2">
                  {costumer.activate_date}
                </td>
                <td className="border border-gray-300 p-2">
                  <span className=" text-red-600 font-bold font-Psans">
                    {costumer.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={openModal}>
                      <Info size={20} className="text-blue-500" />
                    </button>
                    <button>
                      <Trash2
                        size={20}
                        className="text-red-500 hover:text-red-700"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal data */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 z-50 overflow-y-auto"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        >
          <div className="w-full p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-blue-600 text-2xl font-bold mb-6 text-center ">
                Data Pending Customers
              </h1>
              <form>
                {selectedCostumer && (
                  <>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700">Msisdn</label>
                        <input
                          type="text"
                          value={formData.msidn}
                          onChange={(e) =>
                            setFormData({ ...formData, msidn: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">
                          MF Package
                        </label>
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
                          {/* Add options dynamically here */}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="cls" className="block text-gray-700">
                          CLS
                        </label>
                        <input
                          type="text"
                          value={formData.cls}
                          onChange={(e) =>
                            setFormData({ ...formData, cls: e.target.value })
                          }
                          className="w-full border border-gray-900 rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">
                          Apresiasi Bonus
                        </label>
                        <select
                          value={formData.bonus}
                          onChange={(e) =>
                            setFormData({ ...formData, bonus: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option>-- Choose Bonus --</option>
                          {/* Add options dynamically here */}
                        </select>
                      </div>
                    </div>
                    <div className="border-b border-blue-300 w-full"></div>
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
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              full_name: e.target.value,
                            })
                          }
                          placeholder="Insert Name"
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">NIK</label>
                        <input
                          type="text"
                          value={formData.nik}
                          onChange={(e) =>
                            setFormData({ ...formData, nik: e.target.value })
                          }
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
                          value={formData.kk_number}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              kk_number: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="tgl_aktif">Tgl Aktif</label>
                        <input
                          type="date"
                          value={formData.activate_date}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              activate_date: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="tempat_lahir">Tempat Lahir</label>
                        <input
                          type="text"
                          placeholder="Insert Tempat Lahir"
                          value={formData.tempat_lahir}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              activate_date: e.target.value,
                            })
                          }
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
                          value={formData.tgl_lahir}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="alamat">Alamat</label>
                        <input
                          type="text"
                          placeholder="Insert Alamat"
                          value={formData.alamat}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-3 mb-4">
                      <div>
                        <label className="block text-gray-700">
                          Nomor Rumah
                        </label>
                        <input
                          type="text"
                          value={formData.no_rumah}
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
                            value={formData.rt}
                            placeholder="Insert RT"
                            className="w-20 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="rw" className="block text-gray-700">
                            RW
                          </label>
                          <input
                            type="text"
                            value={formData.rw}
                            placeholder="Insert RW"
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
                          value={formData.desa_kelurahan}
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
                          value={formData.kecamatan}
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
                          placeholder="Insert City"
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700">Provinsi</label>
                        <input
                          type="text"
                          value={formData.provinsi}
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
                          placeholder="Insert Alamat Domisili"
                          value={formData.alamat_domisili}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="block text-gray-700">
                          Kota Domisili
                        </label>
                        <input
                          type="text"
                          placeholder="Insert Kota Domisili"
                          value={formData.kota_domisili}
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
                          placeholder="Insert Phone 2"
                          value={formData.phone_2}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="block text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Insert Email"
                          value={formData.email}
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
                          placeholder="Insert WhatsApp"
                          value={formData.whatsapp}
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
                    {/* Lanjutkan penyesuaian untuk semua elemen input lainnya */}
                    <div className="flex justify-evenly gap-2">
                      <button
                        onClick={closeModal}
                        className="w-full bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                      >
                        Feddback
                      </button>
                      <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </Modal>
        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing 1 to 5 of 35 entries
          </span>
          <div className="flex gap-2">
            <button className="bg-gray-300 px-3 py-1 rounded-md text-gray-600">
              Previous
            </button>
            <button className="bg-gray-300 px-3 py-1 rounded-md text-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
