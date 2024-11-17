# API de Vocaloid - Proyecto Parcial 1

## Descripción
Este proyecto consiste en una **API de Vocaloid** que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos de Vocaloids.

## Características de la API

- **Autenticación JWT**: Las rutas POST, PUT y DELETE están protegidas y requieren un token JWT para su ejecución.
- **Validaciones**: Se implementan validaciones para asegurar que los datos enviados cumplen con los requisitos necesarios, como campos obligatorios y formatos de fecha válidos.
- **Operaciones CRUD**: La API permite crear, obtener, actualizar y eliminar Vocaloids de la base de datos.
- **Paginación**: El listado de Vocaloids soporta paginación para mostrar un número limitado de resultados por página.
  
## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)** para la autenticación
- **HTML/CSS** para las vistas y documentación de la API

### Queres clonar el repositorio en tu máquina?

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/api-vocaloid.git
   cd api-vocaloid
