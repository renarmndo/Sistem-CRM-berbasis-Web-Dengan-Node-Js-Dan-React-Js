import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/API";
import Background from "../../assets/img/b7.jpg";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
// import Logo from "../img/Logo/Logo2.png";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Tambahkan state untuk show password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Menandakan proses login sedang berlangsung
    try {
      const response = await login(credentials);

      // Simpan data user ke localStorage
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user)); // Simpan data user
      }

      // Redirect berdasarkan role
      switch (response.user.role) {
        case "agent":
          navigate("/dashboard");
          break;
        case "screener":
          navigate("/dashboard");
          break;
        case "leader":
          navigate("/dashboard");
          break;
        case "activator":
          navigate("/dashboard");
          break;
        default:
          navigate("/unauthorized");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: err.message || "Username atau password salah!",
      });
    } finally {
      setLoading(false); // Menandakan proses login selesai
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-transparent"
      style={{
        backgroundImage: `url(${Background})`, // Menetapkan gambar sebagai background
        backgroundSize: "cover", // Menyesuaikan ukuran background agar memenuhi elemen
        backgroundPosition: "center", // Menempatkan background di tengah
      }}
    >
      <div className="w-full max-w-md ">
        {/* Card Container */}
        <div className="bg-purple-200 shadow-2xl bg-transparent rounded-lg p-8">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-5xl font-bold text-blue-500 font-Psans">
              Ne<span className="text-yellow-500">bula</span>Trecour
            </h1>
            <p className="font-Psans text-gray-300 text-sm">
              Empowering Connections & Driving Growth
            </p>
            <p className="text-gray-300 mt-6 font-roboto">
              Please sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-2">
            {error && (
              <div className="rounded text-center bg-red-200 p-2">
                <p className="text-sm text-red-700 font-roboto">{error}</p>
              </div>
            )}
            {/* Error Handle */}

            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-100"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-100"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {/* Login Button */}
            {/* Loading indikator */}
            {loading && (
              <div className="flex justify-center mt-4">
                <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            )}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              {loading ? "Loggin in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center font-roboto text-md text-gray-400">
            <p>&copy; 2024 NebulaTrecour</p>
          </div>

          {/* Divider */}
          {/* <div className="mt-6 flex items-center justify-center">
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
