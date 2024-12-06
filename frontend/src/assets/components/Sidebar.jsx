import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import "../css/style.css";
import { useState } from "react";
// import Logo from "../img/Logo/Logo2.png";
// import { Link } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  FileInput,
  History,
  UserRoundPlus,
  FilePlus,
} from "lucide-react";
const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <p>Silahkan Login Terlebih Dahulu</p>;
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar dari Akun?",
      text: "Anda yakin ingin keluar dari akun Anda saat ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6b6b",
      cancelButtonColor: "#868e96",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batalkan",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-content",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
      buttonsStyling: false,
      backdrop: "rgba(0,0,0,0.5)",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Berhasil Keluar!",
          text: "Anda telah berhasil keluar dari akun.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.removeItem("user");
          navigate("/");
        });
      }
    });
  };

  const menus = [
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      title: "Pending",
      icon: <Users size={20} />,
      path: "/custumers",
    },
    {
      title: "Form Input",
      icon: <FileInput size={20} />,
      path: "/data-customers",
    },
    {
      title: "History",
      icon: <History size={20} />,
      path: "/history",
    },
    {
      title: "Reports",
      icon: <FileText size={20} />,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/customers/reports",
    },
    {
      title: "Add Users",
      icon: <UserRoundPlus size={20} />,
      path: "/customers/add-users",
    },
    {
      title: "Add Packages",
      icon: <FilePlus size={20} />,
      path: "/add-packages",
    },
  ];

  const roleMenus = {
    leader: ["Dashboard", "Form Input", "Reports", "Add Users", "Add Packages"],
    agent: ["Dashboard", "Form Input", "History"],
    team_fu: ["Dashboard", "History", "Form Input"],
    activator: ["Pending", "Dashboard", "History"],
    screener: ["Dashboard", "Form Input", "Add Users"],
  };
  const [role, setRole] = useState(() => {
    // Parse the token and extract role, defaulting to 'screener' if not found
    const tokenData = localStorage.getItem("user");
    if (tokenData) {
      const parsedToken = JSON.parse(tokenData);
      return parsedToken.role || "agent";
    }
    return "agent";
  }); // Simulasi role

  // Filter menu berdasarkan role
  const filteredMenus = menus.filter((menu) =>
    roleMenus[role]?.includes(menu.title)
  );

  return (
    <div
      className={`
        h-full 
        bg-gradient-to-b 
        from-blue-400 
        to-blue-700 
        text-white 
        shadow-lg 
        transition-all 
        duration-300 
        relative
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-blue-600">
        {isOpen && (
          <h1 className="text-2xl font-bold text-white font-Psans">
            Ne<span className="text-yellow-500">bula</span>Trecour
          </h1>
        )}
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            size={24}
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Navigation Menu */}
      {/* <nav className={`mt-4 ${!isOpen ? "px-2" : "px-4"}`}>
        {menus.map((menu, index) => (
          <button
            key={index}
            className={`
              w-full 
              flex 
              items-center 
              px-4 
              py-3 
              rounded-lg 
              hover:bg-white 
              hover:bg-opacity-10 
              transition-all 
              duration-300
              ${!isOpen ? "justify-center" : "justify-start space-x-3"}
            `}
            onClick={() => navigate(menu.path)}
          >
            <span>{menu.icon}</span>
            {isOpen && <span>{menu.title}</span>}
          </button>
        ))}
      </nav> */}
      <nav className={`mt-4 ${!isOpen ? "px-2" : "px-4"}`}>
        {filteredMenus.map((menu, index) => (
          <button
            key={index}
            className={`
            w-full 
            flex 
            items-center 
            px-4 
            py-3 
            rounded-lg 
            hover:bg-white 
            hover:bg-opacity-10 
            transition-all 
            duration-300
            ${!isOpen ? "justify-center" : "justify-start space-x-3"}
          `}
            onClick={() => navigate(menu.path)}
          >
            <span>{menu.icon}</span>
            {isOpen && <span>{menu.title}</span>}
          </button>
        ))}
      </nav>

      {/* User Profile and Logout Section */}
      <div className="absolute bottom-4 w-full px-4">
        {/* User Profile */}
        {isOpen && (
          <div className="flex items-center space-x-3 mb-4 px-4">
            <CgProfile className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-sm font-medium">{user.nama_user}</p>
              <p className="text-xs text-purple-200">{user.role}</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
            flex 
            items-center 
            w-full 
            px-4 
            py-3 
            rounded-lg 
            hover:bg-white 
            hover:bg-opacity-10 
            transition-all 
            duration-300
            ${!isOpen ? "justify-center" : "justify-start space-x-3"}
          `}
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
