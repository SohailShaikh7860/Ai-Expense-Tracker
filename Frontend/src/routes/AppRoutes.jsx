import { Routes, Route } from "react-router-dom";
import { Login, Home, Dashboard, ForgotPage, SignUp,AddTrip, View, DeleteTrip, EditTrip } from "../pages/pages.js";
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

        <Route
         path="/view/:id"
         element={
          <ProtectedRoute>
            <View />
          </ProtectedRoute>
         }
        />  
        <Route
         path="/delete/:id"
         element={
          <ProtectedRoute>
            <DeleteTrip />
          </ProtectedRoute>
         }
        />
        <Route
         path="/edit/:id"
         element={
          <ProtectedRoute>
            <EditTrip />
          </ProtectedRoute>
         }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
