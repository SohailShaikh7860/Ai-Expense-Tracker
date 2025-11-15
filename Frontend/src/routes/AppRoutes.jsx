import { Routes, Route } from "react-router-dom";
import { Login, Home, Dashboard, ForgotPage, SignUp,AddTrip } from "../pages/pages.js";
import ProtectedRoute from "./ProtectedRoute.jsx";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/forgot"
          element={
              <ForgotPage />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-trip"
          element={
            <ProtectedRoute>
              <AddTrip />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
