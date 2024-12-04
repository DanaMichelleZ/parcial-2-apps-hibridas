import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <ul>
        <li>
          <Link to="/admin/vocaloids">Gestionar Vocaloids</Link>
        </li>
        <li>
          <Link to="/admin/vocaloids/create">Agregar Nuevo Vocaloid</Link>
        </li>
      </ul>
    </div>
  );
}
