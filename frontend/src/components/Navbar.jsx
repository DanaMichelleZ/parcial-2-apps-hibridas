import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/vocaloids">
                Lista de Vocaloids
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <button className="btn btn-danger nav-link" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
