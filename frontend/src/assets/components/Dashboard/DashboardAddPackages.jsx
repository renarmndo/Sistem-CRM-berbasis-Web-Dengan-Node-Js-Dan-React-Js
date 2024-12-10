import { useState, useEffect } from "react";
import axios from "axios";
import { Package, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const DashboardAddPackages = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // state create packages
  const [formData, setFormData] = useState({
    name: "",
    data_size: 0,
    price: 0,
  });

  // const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/packages/create"
  //     );
  //     console.log(response);
  //     setMessage(response.data.msg);
  //     setFormData({ name: "", data_size: 0, price: 0 });
  //     setError(null);
  //     setIsOpen(false);
  //   } catch (error) {
  //     setError(error.response?.data?.msg || "Gagal Menambahkan Data");
  //     setMessage(null);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validasi data
      if (!formData.name || formData.data_size <= 0 || formData.price <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Validasi Data",
          text: "Mohon lengkapi semua field dengan benar",
        });
        return;
      }

      // Kirim data ke API
      const response = await axios.post(
        "http://localhost:5000/api/packages/create",
        {
          name: formData.name,
          data_size: parseInt(formData.data_size, 10),
          price: parseFloat(formData.price),
        }
      );

      // Gunakan response.data.data sebagai paket baru
      const newPackage = response.data.data;

      Swal.fire({
        icon: "success",
        title: "Paket Berhasil Ditambahkan",
        text: `Nama Paket: ${newPackage.name}`,
      });

      // Update packages dengan paket baru
      setPackages((prevPackages) => [...prevPackages, newPackage]);

      // Reset form
      setFormData({ name: "", data_size: 0, price: 0 });
      setError(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saat menambah paket:", error);

      Swal.fire({
        icon: "error",
        title: "Gagal Menambahkan Paket",
        text: error.response?.data?.msg || "Terjadi kesalahan",
      });
    }
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/packages");
        console.log(response.data.data);
        setPackages(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Gagal mengambil data paket");
        setIsLoading(false);
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);

  // console.log(packages);

  const handleDeletePackage = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak dapat mengembalikan paket yang dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus paket!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/packages/${id}`);

        setPackages((prevPackages) =>
          prevPackages.filter((pkg) => pkg.id !== id)
        );

        Swal.fire("Terhapus!", "Paket berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Gagal menghapus paket:", error);
      Swal.fire(
        "Gagal!",
        error.response?.data?.msg || "Tidak dapat menghapus paket.",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <Package size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Package className="mr-2" /> Daftar Paket
        </h2>
      </div>
      <div className="w-full m-4">
        <button
          onClick={handleOpen}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded font-Psans"
        >
          Add New Package
        </button>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Paket
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ukuran Data (GB)
                </th>
                <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga (Rp)
                </th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.length === 0 ? (
                <tr colSpan={5}>
                  <td className="text-center text-gray-500 p-4">
                    Tidak Ada Data Paket Tersedia
                  </td>
                </tr>
              ) : (
                packages.map((pkg, index) => (
                  <tr key={pkg.id}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{pkg.name}</td>
                    <td className="p-3">{pkg.data_size} GB</td>
                    <td className="p-3">
                      {new Intl.NumberFormat("id-ID").format(pkg.price)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Hapus Paket"
                      >
                        <Trash2 size={20} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Tambah Daftar Paket
            </h2>
            <form action="" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name">Nama Paket</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="data_size">Data Size</label>
                <input
                  type="number"
                  value={formData.data_size}
                  onChange={handleChange}
                  name="data_size"
                  id="data_size"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="price">Harga</label>
                <input
                  type="number"
                  step={0.01}
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClose}
                  className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAddPackages;
