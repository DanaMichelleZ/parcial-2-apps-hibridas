# API de Vocaloid - Proyecto Parcial 2

## Descripción
Este proyecto consiste en una **API de Vocaloid** que permite realizar diversas operaciones sobre una base de datos de Vocaloids y motores Vocaloid. La API implementa autenticación, validaciones y operaciones CRUD para gestionar los datos de forma eficiente.

## Características de la API

### Vocaloids
1. **GET /vocaloids**
   - Recupera una lista de todos los Vocaloids almacenados en la base de datos.
   - Soporta parámetros de consulta como:
     - **`nombre`**: Busca Vocaloids cuyo nombre coincida parcialmente.
     - **`sort`**: Ordena los resultados según un campo especificado, como `fechaLanzamiento`.
     - **`limit`**: Limita el número de resultados devueltos.

2. **GET /vocaloids/:id**
   - Recupera un Vocaloid específico por su ID.

3. **POST /vocaloids**
   - Crea un nuevo Vocaloid en la base de datos.
   - **Requiere autenticación mediante JWT.**
   - Campos requeridos:
     - `nombre`, `genero`, `desarrollador`, `idiomas`, `fechaLanzamiento`, `versionMotor`, `motorId`, `imagenPerfil`, `imagenCuerpoCompleto`.

4. **PUT /vocaloids/:id**
   - Actualiza los datos de un Vocaloid existente por su ID.
   - **Requiere autenticación mediante JWT.**

5. **DELETE /vocaloids/:id**
   - Elimina un Vocaloid de la base de datos por su ID.
   - **Requiere autenticación mediante JWT.**

### Motores
1. **GET /motores**
   - Recupera una lista de todos los motores Vocaloid almacenados.

2. **POST /motores**
   - Crea un nuevo motor en la base de datos.
   - **Requiere autenticación mediante JWT.**
   - Campos requeridos:
     - `nombreMotor`, `nombreProducto`, `idiomas`, `fechaLanzamiento`.

### Autenticación
1. **GET /auth/login**
   - Genera un token JWT válido tras verificar las credenciales del usuario.

## Validaciones
- Todas las rutas POST y PUT realizan validaciones estrictas para asegurarse de que los datos proporcionados cumplen con los requisitos esperados, como:
  - **Nombre**: No puede estar vacío.
  - **Género**: Debe ser `Masculino`, `Femenino` o `Desconocido`.
  - **Idiomas**: Debe ser un arreglo no vacío.
  - **Fecha de lanzamiento**: Debe ser una fecha válida.
  - **Referencias**: Se valida que los IDs referenciados (como `motorId`) existan en la base de datos.

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)** para la autenticación
- **Postman** para pruebas de API


Antes de realizar solicitudes POST, PUT o DELETE, es necesario obtener un token JWT mediante la ruta /auth/login.
Pruebas con Postman:

Configura el token JWT en los encabezados de las solicitudes protegidas:
Key: Authorization
Value: Bearer <tu_token_jwt>
Realiza solicitudes GET, POST, PUT o DELETE según sea necesario.
Estructura de la Base de Datos:

La base de datos contiene dos colecciones principales:
Vocaloids: Información detallada sobre cada Vocaloid, incluyendo su motor asociado.
Motores: Datos de los motores Vocaloid.
Limitaciones del Proyecto
Motores: Actualmente solo se permiten solicitudes GET y POST. No se implementaron rutas para actualizar o eliminar motores.
Errores manejados: Se devuelven mensajes claros en caso de errores, como autenticación inválida o datos faltantes.