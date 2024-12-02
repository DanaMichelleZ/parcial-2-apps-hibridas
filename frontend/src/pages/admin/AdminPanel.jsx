import React from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="admin-panel">
      <h1>Panel de Administrador</h1>
      <p>Bienvenido al panel de administración. Desde aquí puedes gestionar los recursos del sistema.</p>

      <div className="admin-actions">
        <Link to="/admin/vocaloids" className="admin-link">
          Gestionar Vocaloids
        </Link>
        <Link to="/admin/motores" className="admin-link">
          Gestionar Motores
        </Link>
        <Link to="/admin/usuarios" className="admin-link">
          Gestionar Usuarios
        </Link>
      </div>
    </div>
  );
}
