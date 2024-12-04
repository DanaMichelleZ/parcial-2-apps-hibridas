import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VocaloidList from "./pages/VocaloidList";
import VocaloidDetail from "./pages/VocaloidDetail";
import MotorList from "./pages/MotorList";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminVocaloidList from "./pages/admin/AdminVocaloidList";
import AdminVocaloidCreate from "./pages/admin/AdminVocaloidCreate";
import AdminVocaloidEdit from "./pages/admin/AdminVocaloidEdit";
import AdminMotorList from "./pages/admin/AdminMotorList";
import AdminMotorCreate from "./pages/admin/AdminMotorCreate";
import AdminMotorEdit from "./pages/admin/AdminMotorEdit";
import AdminUsuarioList from "./pages/admin/AdminUsuarioList";
import AdminUsuarioCreate from "./pages/admin/AdminUsuarioCreate";
import AdminUsuarioEdit from "./pages/admin/AdminUsuarioEdit";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas Protegidas */}
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

          {/* Panel de Administración */}
          <Route
            path="/admin/panel"
            element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vocaloids"
            element={
              <ProtectedRoute adminOnly>
                <AdminVocaloidList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vocaloids/create"
            element={
              <ProtectedRoute adminOnly>
                <AdminVocaloidCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vocaloids/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminVocaloidEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/motores"
            element={
              <ProtectedRoute adminOnly>
                <AdminMotorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/motores/create"
            element={
              <ProtectedRoute adminOnly>
                <AdminMotorCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/motores/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminMotorEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsuarioList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios/create"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsuarioCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsuarioEdit />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
