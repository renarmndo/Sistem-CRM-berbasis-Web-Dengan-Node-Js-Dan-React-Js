import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children, allowRoles }) => {
  // Tambahkan try-catch untuk handling JSON parse error
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    // // Debug log
    // console.log("Current user:", user);
    // console.log("Allowed roles:", allowRoles);

    if (!user) {
      console.log("No user found, redirecting to login");
      return <Navigate to="/" replace />;
    }

    // Periksa apakah role ada dan sesuai
    if (allowRoles && !allowRoles.includes(user.role)) {
      console.log("Unauthorized role. User role:", user.role);
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    console.error("Error in ProtectedRoutes:", error);
    localStorage.removeItem("user"); // Clear invalid data
    return <Navigate to="/" replace />;
  }
};
