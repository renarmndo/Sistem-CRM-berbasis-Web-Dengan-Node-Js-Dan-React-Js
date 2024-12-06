import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  // SquarePlus,
  // Search,
  UserPen,
  Trash2,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";

const DashboardAddUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nama_user: "",
    role: "agent", // Default role, bisa disesuaikan
  });

  // state ambil data
  const [users, setUsers] = useState([]);
  // state pagintion
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 5;
  // state modal
  const [isOpen, setIsOpen] = useState(false);
  // error
  const [errors, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // fungsi menangani submit form
  // const handleSubmit = async (e) => {
  //   e.prevenDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/register",
  //       formData
  //     );
  //     Swal.fire({
  //       icon: "success",
  //       title: "Pendaftaran Users Berhasil",
  //       text: response.data.msg,
  //     });
  //   } catch (error) {
  //     // pop up error
  //     Swal.fire({
  //       icon: "error",
  //       title: "terjadi kesalahan",
  //       text: error.response?.data?.msg || "Terjadi Kesalahan !",
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Mengirim role dalam header
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil",
        text: response.data.msg,
      });
    } catch (err) {
      console.error("Error:", err); // Debugging: periksa kesalahan jika terjadi
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: err.response?.data?.msg || "Terjadi kesalahan pada server",
      });
    }
  };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter dan Pagination
  const filteredAndPaginatedUsers = useMemo(() => {
    // Filter berdasarkan search term
    const filteredUsers = users.filter(
      (user) =>
        user.nama_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
    };
  }, [users, currentPage, searchTerm]);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredAndPaginatedUsers.total / usersPerPage);

  // Handler pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Delete data
  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        Swal.fire("Deleted!", "User has been deleted.", "success");

        // Refresh data
        const refreshUsers = async () => {
          const response = await axios.get("http://localhost:5000/api/users");
          setUsers(response.data.data);
        };
        refreshUsers();
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to delete user. Please try again.",
          "error"
        );
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center text-blue-500 font-Psans">
          <Users className="mr-2" /> Daftar Pengguna
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-color"
        >
          <Plus className="mr-2" /> Add New User
        </button>
      </div>
      <div>
        <table className="w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndPaginatedUsers.users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{user.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {user.nama_user}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{user.username}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.role === "leader"
                        ? "bg-red-100 text-red-800"
                        : user.role === "activator"
                        ? "bg-yellow-100 text-yellow-800"
                        : user.role === "team_fu"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "screener"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                  <button>
                    <UserPen className="text-blue-500" size={20} />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="text-red-500" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600">
            Menampilkan {(currentPage - 1) * usersPerPage + 1} -{" "}
            {Math.min(
              currentPage * usersPerPage,
              filteredAndPaginatedUsers.total
            )}{" "}
            dari {filteredAndPaginatedUsers.total} pengguna
          </span>
          <div className="flex space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <ChevronLeft className="mr-2" /> Sebelumnya
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Selanjutnya <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isOpen && (
        <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-1/2">
            <h2 className="text-xl font-semibold font-Psans mb-6 text-blue-500">
              Add New User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor=""
                  className="font-Psans block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-Psans block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="font-Psans block text-sm font-medium text-gray-700"
                >
                  Nama Pengguna
                </label>
                <input
                  type="text"
                  name="nama_user"
                  value={formData.nama_user}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-Psans block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="font-Psans block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="leader">Leader</option>
                  <option value="team_fu">Team Follow Up</option>
                  <option value="activator">Activator</option>
                  <option value="screener">Screener</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500"
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

export default DashboardAddUser;
