import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    // Comproueba si el usuario ta autenticado buscando el token en localStorage
    const isAuthenticated = !!localStorage.getItem("token");
    const isAdmin = localStorage.getItem("role") === "admin";

    //Debuggin xd muchos console logs ups para estar segura
    console.log("Token from localStorage:", localStorage.getItem("token"));
    console.log("Role from localStorage:", localStorage.getItem("role"));
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isAdmin:", isAdmin);

    // Elimina el token y el role del localStorage para desconectar al usuario
    const handleLogout = () => {
        console.log("Cerrando sesión...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login"); // Redirige login
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
                    aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {isAuthenticated && (  // usuario autenticado = se muestran los enlaces de Lista de Vocaloids y Lista de Motores :3
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/vocaloids">
                                        Lista de Vocaloids
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/motores">
                                        Lista de Motores
                                    </Link>
                                </li>
                            </>
                        )}
                        {isAuthenticated && isAdmin && ( // usuario autenticado con rol de admin = se muestra un enlace al Panel de Admin :3
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/panel">
                                    Admin Panel
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger nav-link"
                                    onClick={handleLogout}
                                >
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
