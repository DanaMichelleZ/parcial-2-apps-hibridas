import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Bienvenido a la API de Vocaloid</h1>
      <p>
        Esta aplicación te permite explorar y gestionar información detallada sobre los Vocaloids y sus motores asociados. A través de esta herramienta, puedes crear, editar, eliminar Vocaloids y Motores, así como consultar y gestionar usuarios, todo de manera sencilla y eficiente.
      </p>

      <h2>¿Qué Puedes Hacer desde POSTMAN?</h2>
      <ul>
        <li>
          <strong>Consultar Vocaloids:</strong> Obtén una lista de todos los Vocaloids disponibles o consulta los detalles de un Vocaloid específico, incluyendo información como género, idiomas, motor asociado, y más.
        </li>
        <li>
          <strong>Gestionar Motores:</strong> Visualiza y administra los motores Vocaloid. Puedes agregar nuevos motores con atributos como nombre, idiomas y fecha de lanzamiento.
        </li>
        <li>
          <strong>Crear Vocaloids:</strong> Añade nuevos Vocaloids al sistema especificando sus atributos clave y asignándoles un motor Vocaloid existente.
        </li>
        <li>
          <strong>Actualizar Vocaloids:</strong> Modifica la información de Vocaloids ya registrados para mantener la base de datos actualizada.
        </li>
        <li>
          <strong>Gestionar Usuarios:</strong> Crea, edita y elimina usuarios. Puedes asignarles roles de administración y realizar otros cambios en sus datos.
        </li>
        <li>
          <strong>Seguridad con JWT:</strong> Todas las operaciones de creación, actualización y eliminación de datos están protegidas por autenticación mediante tokens JWT.
        </li>
      </ul>

      <h2>Características del Proyecto</h2>
      <p>
        Este proyecto utiliza tecnologías modernas como <strong>Node.js</strong>, <strong>Express</strong>, <strong>MongoDB</strong> y <strong>React</strong>. Además, implementa prácticas de desarrollo seguro como autenticación con <strong>JWT</strong> para garantizar la integridad de los datos.
      </p>

      <h2>Sobre Vocaloid</h2>
      <p>
        <strong>Vocaloid</strong> es un software innovador desarrollado por <strong>Yamaha Corporation</strong> que permite la síntesis de voz para crear canciones completas. Con personajes icónicos como <em>Hatsune Miku</em>, Vocaloid se ha convertido en una herramienta esencial para artistas digitales y músicos en todo el mundo.
      </p>

      <h3>¿Cómo Funciona?</h3>
      <p>
        Vocaloid utiliza bancos de voz pregrabados y un motor avanzado de síntesis vocal que permite a los usuarios manipular parámetros como tono, velocidad y efectos, ofreciendo una experiencia única en la creación de música.
      </p>

      <h2>Explora la API</h2>
      <p>Accede a las principales funcionalidades:</p>
      <div className="actions">
        <button onClick={() => navigate("/vocaloids")} className="btn btn-primary">
          Ver Lista de Vocaloids
        </button>
        <button onClick={() => navigate("/motores")} className="btn btn-secondary">
          Ver Motores Vocaloid
        </button>
      </div>
    </div>
  );
}
