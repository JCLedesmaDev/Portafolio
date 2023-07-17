---------------------------------------------

# API CRUD con NodeJS + ExpressJS + TypeScript y MongoDB. 

API CRUD en NodeJS con manejo de Roles implementando una arquitectura orientada a Microservicios desarrollada con TypeScript, utilizando ExpressJS como framework y Mongoose como ODM de MongoDB.

## Dependencias utilizadas:
 * [TypeScript](https://www.npmjs.com/package/typescript).
 * [Express](https://expressjs.com/) | [@types/express](https://www.npmjs.com/package/@types/express) - Framework de NodeJS.
 * [Cors](https://www.npmjs.com/package/cors) | [@types/cors](https://www.npmjs.com/package/@types/cors) - Permite el acceso a las peticiones HTTP hacia nuestro BE.
 * [Dotenv](https://www.npmjs.com/package/dotenv) - Permite el uso de las variables de entorno.
 * [Mongoose](https://mongoosejs.com/) - ODM de MongoDB.
 * [Nodemon](https://nodemon.io/) - Monitorea los cambios en el código fuente que se está desarrollando y automáticamente reinicia el servidor.
 * [Mongoose-delete](https://www.npmjs.com/package/mongoose-delete) | [@types/mongoose-delete](https://www.npmjs.com/package/@types/mongoose-delete) - Este paquete nos permite indicarle a nuestros modelos (colecciones) que hagan uso de estrategias de "Soft Delete - borrado logico, permitiendonos persistir los registros eliminados.
 * [Ts-node](https://www.npmjs.com/package/ts-node) | [@types/node](https://www.npmjs.com/package/ts-node) - Nos permite ejecutar Typescript en un proyecto de Nodejs.
 * [Bcrypt](https://www.npmjs.com/package/bcrypt) | [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt) - Permite el hasheo de claves.
 * [Mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) - Para paginar todos los registro de una coleccion de mongoose.   
 * [Config](https://www.npmjs.com/package/config) | [@types/config](https://www.npmjs.com/package/@types/config) - Nos permite definir un conjunto de parámetros predeterminados y extenderlos para diferentes entornos de implementación (desarrollo, control de calidad, preparación, producción, etc.).
 * [Node-config](https://www.npmjs.com/package/config) - Permite pasarle valores a nuestros parametros del "Config" por medio de las variables de entorno del .ENV .
 * [Rimraf](https://www.npmjs.com/package/rimraf) - Eliminados de carpetas por comando.
 * [Morgan](https://www.npmjs.com/package/morgan) | [@types/mogan](https://www.npmjs.com/package/@types/morgan) - Loguea en consola, las peticiones HTTP Request.  
 * [Express-validators](https://express-validator.github.io/docs/) - Middleware que permite validar los datos provenientes del Request.
 * [Jsonwebtokens](https://www.npmjs.com/package/jsonwebtoken) | [@types/jsonwebtokens](https://www.npmjs.com/package/@types/jsonwebtoken).


## Requerimientos:
Instalar el entorno de NodeJS en tu Sistema Operativo - https://nodejs.org/es/.

Este proyecto se conecta a una Base de Datos ubicada en Mongo Atlas, pero puede instalar MongoDB en su PC y utilizar su propia Base de Datos o sino, crear una cuenta en Mongo Atlas.

 * Utiliza [Mongo Atlas](https://www.mongodb.com/atlas/database/).
 * Descarga [MongoDB](https://www.mongodb.com/try/download/community).

## Instalación de configuración del proyecto:

Instale las depedencias del proyecto, ejecutando en la terminal, desde la ruta raiz del proyecto:

```bash
  npm install
```

## Variables de entorno:

Para ejecutar este proyecto Back End, deberá agregar las siguientes variables de entorno al archivo `.env`:

```bash
## Contrasena de administrador 
PASSWORD_ADMIN=password_admin

## Entorno de desarrollo
NODE_ENV=development || production

## Puerto de SV
PORT=99999
PUBLIC_URL=http://localhost....

## Clave super secreta
JWT_SECRET=claveSuperSecreta

## Conexion de base de datos
CONNECTION_DB=conexionBaseDatos


```
El archivo `.env` debe estar en la ruta raíz del proyecto.

**Aclaraciones:**

Dado el caso de que no se llegase a crear el archivo `.env`, existen valores cargados por defecto dentro de `Server > config > default.js`


## Despliegue:

**Development**

Para ejecutar el proyecto en modo de desarrollo, ejecute en la terminal:

```bash
  npm run dev
```

**Production**

Para generar los archivos del proyecto para producción, ejecute el comando:

```bash
  npm run build
```
La carpeta de producción se generará en la ruta raíz del proyecto. El nombre de la carpeta será **dist**.