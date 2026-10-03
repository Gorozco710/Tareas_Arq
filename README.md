# Core Project

Proyecto Django modular con las aplicaciones `users`, `inventory`, `orders`, `marketing` y `logistics`. Incluye una API REST para inventario protegida con JWT.

## Requisitos

- Python 3.10 o superior.

## Instalación y ejecución

Abre una terminal en la carpeta `core_project`, donde se encuentra `manage.py`, y crea un entorno virtual:

En Windows:

```powershell
py -m venv venv
```

En macOS o Linux:

```bash
python3 -m venv venv
```

Activa el entorno virtual.

En Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

En macOS o Linux:

```bash
source venv/bin/activate
```

Instala dependencias y crea las tablas:

```bash
python -m pip install -r requirements.txt
python manage.py migrate
```

Para crear un usuario que pueda obtener tokens JWT:

```bash
python manage.py createsuperuser
```

Inicia el servidor:

```bash
python manage.py runserver
```

El administrador está en `http://127.0.0.1:8000/admin/`. La raíz `/` no tiene una página configurada.

## API y JWT

Solicita un par de tokens enviando las credenciales del usuario de Django:

```http
POST http://127.0.0.1:8000/api/token/
Content-Type: application/json

{"username": "usuario", "password": "contraseña"}
```

Envía el token de acceso en las solicitudes a la API:

```http
Authorization: Bearer <access>
```

Renueva el token de acceso con:

```http
POST http://127.0.0.1:8000/api/token/refresh/
Content-Type: application/json

{"refresh": "<refresh>"}
```

Endpoints protegidos disponibles:

- `/api/categorias/`
- `/api/productos/`
- `/api/inventarios/`

Por ahora, solo inventario expone endpoints REST. `orders`, `marketing`, `logistics` y `users` contienen modelos, pero no rutas API. El inicio de sesión JWT utiliza los usuarios de autenticación de Django; `UserProfile` es un modelo de perfil independiente.
