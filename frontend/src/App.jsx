import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VocaloidList from "./pages/VocaloidList";
import VocaloidDetail from "./pages/VocaloidDetail";
import MotorList from "./pages/MotorList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/vocaloids"
            element={
              <ProtectedRoute>
                <VocaloidList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vocaloids/:id"
            element={
              <ProtectedRoute>
                <VocaloidDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/motores"
            element={
              <ProtectedRoute>
                <MotorList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;