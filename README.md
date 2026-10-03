# Core Project

Proyecto Django organizado en cinco aplicaciones:

* `users`
* `inventory`
* `orders`
* `marketing`
* `logistics`

Actualmente, la API REST expone los recursos de **inventario** y los protege mediante **autenticación JWT**.

---

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* **Python 3.10 o superior**
* Las dependencias incluidas en `requirements.txt`

---

## Instalación y ejecución

Abre una terminal en la carpeta principal del proyecto:

```text
core_project/
├── manage.py
├── requirements.txt
├── users/
├── inventory/
├── orders/
├── marketing/
└── logistics/
```

### 1. Crear el entorno virtual

#### Windows

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 2. Instalar las dependencias

Con el entorno virtual activado, ejecuta:

```bash
python -m pip install -r requirements.txt
```

---

### 3. Preparar la base de datos

Ejecuta las migraciones:

```bash
python manage.py migrate
```

También puedes comprobar que la configuración del proyecto sea correcta:

```bash
python manage.py check
```

Si el comando termina sin errores, la configuración básica del proyecto está correcta.

---

## Crear un usuario administrador

Para acceder al panel de administración de Django y utilizar la autenticación JWT, crea un superusuario:

```bash
python manage.py createsuperuser
```

La terminal solicitará:

* Nombre de usuario
* Correo electrónico
* Contraseña

Sigue las indicaciones que aparecen en pantalla.

---

## Iniciar el servidor

Para ejecutar el proyecto localmente:

```bash
python manage.py runserver
```

Por defecto, el servidor estará disponible en:

**http://127.0.0.1:8000/**

### Panel de administración

El administrador de Django está disponible en:

**http://127.0.0.1:8000/admin/**

---

# API REST y autenticación JWT

Los endpoints de inventario requieren autenticación mediante un **token JWT**.

El flujo de autenticación consiste en:

1. Obtener un token JWT.
2. Utilizar el token `access` para acceder a los endpoints protegidos.
3. Utilizar el token `refresh` para obtener un nuevo token `access` cuando este expire.

---

## Obtener tokens JWT

Envía las credenciales de un usuario de Django mediante una petición `POST` a:

```http
POST http://127.0.0.1:8000/api/token/
Content-Type: application/json
```

Cuerpo de la petición:

```json
{
    "username": "tu_usuario",
    "password": "tu_contraseña"
}
```

La respuesta incluirá dos tokens:

```json
{
    "refresh": "REFRESH_TOKEN",
    "access": "ACCESS_TOKEN"
}
```

El token `access` se utiliza para acceder a los endpoints protegidos.

---

## Consultar un endpoint protegido

Para acceder a un recurso protegido, incluye el token `access` en la cabecera `Authorization`.

Por ejemplo:

```http
GET http://127.0.0.1:8000/api/categorias/
Authorization: Bearer <ACCESS_TOKEN>
```

El formato de la cabecera es:

```text
Authorization: Bearer <ACCESS_TOKEN>
```

---

## Renovar el token de acceso

Cuando el token `access` expire, puedes utilizar el token `refresh` para obtener uno nuevo.

Realiza una petición `POST` a:

```http
POST http://127.0.0.1:8000/api/token/refresh/
Content-Type: application/json
```

Cuerpo de la petición:

```json
{
    "refresh": "<REFRESH_TOKEN>"
}
```

La respuesta proporcionará un nuevo token `access`.

---

# Endpoints disponibles

Actualmente, la API REST expone los siguientes endpoints:

| Recurso     | Endpoint            |
| ----------- | ------------------- |
| Categorías  | `/api/categorias/`  |
| Productos   | `/api/productos/`   |
| Inventarios | `/api/inventarios/` |

Todos estos endpoints requieren autenticación mediante JWT.

---

# Aplicaciones del proyecto

El proyecto está dividido en cinco aplicaciones Django:

| Aplicación  | Descripción                                    |
| ----------- | ---------------------------------------------- |
| `users`     | Gestión de usuarios y perfiles                 |
| `inventory` | Gestión de categorías, productos e inventarios |
| `orders`    | Gestión relacionada con pedidos                |
| `marketing` | Funcionalidades relacionadas con marketing     |
| `logistics` | Funcionalidades relacionadas con logística     |

Actualmente, las aplicaciones `users`, `orders`, `marketing` y `logistics` contienen modelos, pero **no exponen endpoints REST**.

---

## Nota sobre los usuarios

La autenticación JWT utiliza el **modelo de usuario de Django**.

`UserProfile` es un modelo de perfil independiente que complementa la información del usuario, pero **no reemplaza al modelo de usuario utilizado para la autenticación**.

---

# Resumen del flujo de uso

Una vez instalado el proyecto, el flujo básico es:

```text
1. Crear y activar el entorno virtual
              ↓
2. Instalar requirements.txt
              ↓
3. Ejecutar las migraciones
              ↓
4. Crear un superusuario
              ↓
5. Iniciar el servidor
              ↓
6. Obtener tokens JWT
              ↓
7. Utilizar el token access
              ↓
8. Acceder a los endpoints protegidos
```

---

## Comandos principales

Para tenerlos a mano:

### Windows

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py createsuperuser
python manage.py runserver
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py createsuperuser
python manage.py runserver
```
