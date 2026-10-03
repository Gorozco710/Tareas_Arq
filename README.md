```markdown
# Core Project

Proyecto Django organizado en cinco aplicaciones: `users`, `inventory`, `orders`, `marketing` y `logistics`. Actualmente, la API REST expone los recursos de inventario y los protege mediante autenticación JWT.

## Requisitos

- Python 3.10 o superior.
- El archivo `requirements.txt` incluido en el proyecto.

## Instalación y ejecución

Abre una terminal en la carpeta `core_project`, donde se encuentra `manage.py`.

### Windows

Crea y activa un entorno virtual:

```powershell
py -m venv venv
`Activate.ps1`
```

### macOS o Linux

Crea y activa un entorno virtual:

```bash
python3 -m venv venv
source venv/bin/activate
```

### Instalar dependencias y preparar la base de datos

Con el entorno virtual activado, ejecuta:

```bash
python -m pip install -r `requirements.txt`
python `manage.py` migrate
```

Puedes comprobar la configuración con:

```bash
python `manage.py` check
```

### Crear un usuario

Crea un usuario de Django para acceder al administrador y obtener tokens JWT:

```bash
python `manage.py` createsuperuser
```

Sigue las indicaciones de la terminal para definir el nombre de usuario, correo y contraseña.

### Iniciar el servidor

```bash
python `manage.py` runserver
```

El administrador está disponible en:

- `http://127.0.0.1:8000/admin/`

## API y autenticación JWT

Todas las rutas de inventario requieren un token JWT.

### Obtener tokens

Envía las credenciales de un usuario de Django mediante `POST` a `/api/token/`:

```http
POST http://127.0.0.1:8000/api/token/
Content-Type: application/json

{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}
```

La respuesta incluye un token `access` y uno `refresh`.

### Consultar un endpoint protegido

Incluye el token `access` en la cabecera `Authorization`:

```http
GET http://127.0.0.1:8000/api/categorias/
Authorization: Bearer <ACCESS_TOKEN>
```

### Renovar el token de acceso

Cuando el token de acceso expire, envía el token `refresh` mediante `POST` a `/api/token/refresh/`:

```http
POST http://127.0.0.1:8000/api/token/refresh/
Content-Type: application/json

{
  "refresh": "<REFRESH_TOKEN>"
}
```

### Endpoints disponibles

- `/api/categorias/`
- `/api/productos/`
- `/api/inventarios/`

Por el momento, `users`, `orders`, `marketing` y `logistics` contienen modelos, pero no exponen endpoints REST.

## Nota sobre usuarios

La autenticación JWT utiliza el modelo de usuario de Django. `UserProfile` es un modelo de perfil separado y no reemplaza al usuario de autenticación.
```
