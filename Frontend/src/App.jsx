import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TripProvider } from "./context/TripContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TripProvider>
          <AppRoutes />
        </TripProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
