# API REST - Tarea 02

API REST para la gestión de usuarios desarrollada con **Node.js**, **Express** y **TypeScript**, con documentación interactiva integrada mediante **Swagger UI**.

## Requisitos

- Node.js (v18 o superior)
- npm

## Instalación

```bash
git clone URL_DEL_REPOSITORIO
cd api
npm install
```

## Ejecutar

```bash
npm run dev
```

## Compilar

```bash
npm run build
```

## Ejecutar producción

```bash
npm start
```

Servidor:

http://localhost:3000

## Documentación Swagger

http://localhost:3000/docs

## Endpoints

GET /users - Obtiene el listado completo de usuarios

GET /users/:id - Obtiene la información de un usuario específico por ID

POST /users - Registra un nuevo usuario

PUT /users/:id - Reemplaza completamente los datos de un usuario existente

PATCH /users/:id - Actualiza parcialmente la información de un usuario

DELETE /users/:id - Elimina un usuario por ID

## Ejemplo de Registro de Usuario

**Solicitud POST /users:**

```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "age": 22
}
```

**Respuesta:**

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "age": 22
}
```

## Estructura del Proyecto

```text
api/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── swagger/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

## Rama de Trabajo

* **Entrega:** `hw-02`
* **Rama base:** `main`

## Consideraciones

- Los usuarios se almacenan en memoria (sin base de datos externa).
- El servidor debe estar en ejecución para acceder a Swagger UI.