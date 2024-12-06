import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerPage from "./assets/components/Pages/CostumerPage";
import LeaderPages from "./assets/components/Pages/LeaderPages";
// import DashboardPage from "./assets/components/Layouts/DashboardLayouts";
import LoginForm from "./assets/components/LoginForm";
import { ProtectedRoutes } from "./assets/components/ProtectedRoutes";
import Unauthorized from "./assets/components/Unauthorized";
import MenuDashborad from "./assets/components/Pages/MenuDashborad";
import Pages from "./assets/components/Pages/Pages";
import HistoryPages from "./assets/components/Pages/HistoryPages";
import ReportPages from "./assets/components/Pages/ReportPages";
import AddUserPages from "./assets/components/Pages/AddUserPages";
import AddPackagesPages from "./assets/components/Pages/AddPackagesPages";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman login */}
        <Route path="/" element={<LoginForm />} />
        {/* Route Sidebar */}
        <Route path="/dashboard" element={<Pages />} />
        {/* Route Agent */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/custumers" element={<MenuDashborad />} />
        <Route
          path="/customers/reports"
          element={
            <ProtectedRoutes allowRoles={["leader"]}>
              <LeaderPages />
            </ProtectedRoutes>
          }
        />
        {/* Rute untuk dashboard leader dengan proteksi */}
        {/* Route untuk Agent */}
        <Route
          path="dashboard/agent"
          element={
            <ProtectedRoutes allowRoles={["agent"]}>
              <CustomerPage />
            </ProtectedRoutes>
          }
        />
        {/* Route untuk Agent */}
        <Route
          path="dashboard/activator"
          element={
            <ProtectedRoutes allowRoles={["activator"]}>
              <LeaderPages />
            </ProtectedRoutes>
          }
        />
        {/* Router Menu Naviagasi */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes allowRoles={["agent", "screener", "leader"]}>
              <CustomerPage />
            </ProtectedRoutes>
          }
        />
        <Route path="/data-customers" element={<CustomerPage />} />
        {/* HISTORI PAGES */}
        <Route
          path="/history"
          element={
            <ProtectedRoutes allowRoles={["agent"]}>
              <HistoryPages />
            </ProtectedRoutes>
          }
        />
        {/* Report Pages */}
        <Route
          path="/reports"
          element={
            <ProtectedRoutes allowRoles={["leader"]}>
              <ReportPages />
            </ProtectedRoutes>
          }
        />
        {/* add users */}
        <Route
          path="/customers/add-users"
          element={
            <ProtectedRoutes allowRoles={["leader"]}>
              <AddUserPages />
            </ProtectedRoutes>
          }
        />
        {/* Add packages */}
        <Route
          path="/add-packages"
          element={
            <ProtectedRoutes allowRoles={["leader"]}>
              <AddPackagesPages />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
