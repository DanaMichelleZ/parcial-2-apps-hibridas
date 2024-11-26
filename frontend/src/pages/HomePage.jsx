import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Bienvenido a la API de Vocaloid</h1>
      <p>
        Esta API está diseñada para proporcionar información detallada sobre los diferentes Vocaloids y los motores Vocaloid asociados. A través de esta herramienta, puedes explorar, gestionar y modificar los datos relacionados con Vocaloids y sus motores de manera sencilla y eficiente.
      </p>

      <h2>¿Qué Puedes Hacer con la API?</h2>
      <ul>
        <li><strong>Obtener Vocaloids:</strong> Consulta una lista completa de Vocaloids disponibles o los detalles de un Vocaloid específico, incluyendo su motor asociado.</li>
        <li><strong>Gestionar Motores:</strong> Visualiza y administra los motores Vocaloid que sustentan las capacidades de síntesis de los Vocaloids.</li>
        <li><strong>Crear Vocaloids:</strong> Añade nuevos Vocaloids al sistema, especificando atributos como nombre, género, idioma, desarrollador, y el motor Vocaloid relacionado.</li>
        <li><strong>Actualizar Vocaloids:</strong> Modifica los datos de Vocaloids existentes para mantener la información actualizada.</li>
        <li><strong>Eliminar Vocaloids:</strong> Elimina registros de Vocaloids que ya no sean necesarios.</li>
      </ul>

      <h2>Autenticación y Seguridad</h2>
      <p>
        Para garantizar la seguridad, las operaciones que modifican los datos (crear, actualizar o eliminar Vocaloids y motores) requieren autenticación mediante tokens JWT. Solo los usuarios autorizados pueden realizar estas acciones, lo que protege la integridad de la información.
      </p>

      <h2>Sobre Vocaloid</h2>
      <p>
        <strong>Vocaloid</strong> es un software revolucionario de síntesis de voz desarrollado por <strong>Yamaha Corporation</strong>. Permite a los usuarios crear canciones completas utilizando bancos de voz pregrabados llamados "voicebanks". Con personajes icónicos como <em>Hatsune Miku</em>, Vocaloid ha transformado la música digital, permitiendo personalizar voces y melodías con un nivel de detalle sin precedentes.
      </p>

      <h3>¿Cómo Funciona?</h3>
      <p>
        Vocaloid utiliza un proceso de síntesis por concatenación para ensamblar fragmentos de sonidos grabados y generar una interpretación vocal realista. Los usuarios pueden controlar parámetros como tonalidad, velocidad y timbre, brindando una experiencia creativa y única.
      </p>

      <h2>Explora la Aplicación</h2>
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
