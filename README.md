# HW-05 · TaskFlow

Monorepo con dos aplicaciones y una librería JavaScript compartida. Permite crear, listar, completar y eliminar tareas desde una interfaz web conectada a una API REST.

## Estructura

| Ruta | Responsabilidad |
| --- | --- |
| `apps/web` | Frontend HTML/CSS/JavaScript con Vite |
| `apps/api` | Backend Node.js y Express |
| `packages/shared` | Validación, estados y estadísticas compartidos |
| `turbo.json` | Orden, caché y tareas persistentes |
| `package.json` | Workspaces y comandos desde la raíz |
| `.github/workflows/ci.yml` | Compilación y pruebas en GitHub Actions |

## Herramienta y justificación

Se utiliza **Turborepo** para coordinar tareas, respetar dependencias entre paquetes y reutilizar resultados mediante caché. npm workspaces instala las dependencias y enlaza `@hw/shared` localmente; Turborepo ejecuta las tareas sobre esos workspaces. Hay un único `package-lock.json` en la raíz.

`build.dependsOn: ["^build"]` procesa primero las dependencias compartidas. `outputs: ["dist/**"]` permite restaurar los artefactos de las aplicaciones. El paquete compartido es JavaScript ESM sin transpilación: su build comprueba la sintaxis y exporta el código fuente. `dev` y `start` son tareas persistentes sin caché.

Referencia: https://turborepo.dev/docs/crafting-your-repository/configuring-tasks

## Requisitos y ejecución desde cero

Instalar Git y Node.js 22.14 o superior con npm. Se recomienda npm 11.9.0, declarado en `packageManager`.

El proyecto se encuentra en la rama `hw-05` de [Tareas_Arq](https://github.com/Gorozco710/Tareas_Arq/tree/hw-05). Desde una terminal:

```powershell
git clone --branch hw-05 --single-branch https://github.com/Gorozco710/Tareas_Arq.git
cd Tareas_Arq
npm ci
npm run dev
```

Abrir http://localhost:5173. La API escucha en http://localhost:3001/api/health. Vite reenvía `/api` hacia la API, sin configurar CORS. Detener con Ctrl+C. No se requieren archivos `.env` ni bases de datos.

Si PowerShell bloquea `npm.ps1`, ejecutar los mismos comandos con `npm.cmd`, por ejemplo `npm.cmd ci`.

## Comandos desde la raíz

| Comando | Acción |
| --- | --- |
| `npm ci` | Instalación reproducible de todos los workspaces |
| `npm install` | Instalación inicial o actualización del lockfile |
| `npm run dev` | Ejecutar frontend y backend en desarrollo |
| `npm run dev:web` | Solo frontend, puerto 5173 |
| `npm run dev:api` | Solo backend, puerto 3001 |
| `npm run build` | Compilar/verificar todos los paquetes |
| `npm run build:web` | Compilar frontend y sus dependencias |
| `npm run build:api` | Compilar backend y sus dependencias |
| `npm test` | Ejecutar todas las pruebas |
| `npm run test:web` | Pruebas del modelo del frontend |
| `npm run test:api` | Pruebas HTTP del backend |
| `npm run start` | Ejecutar ambos builds, después de compilar |
| `npm run start:web` | Servir build del frontend, puerto 4173 |
| `npm run start:api` | Ejecutar build del backend, puerto 3001 |

Para verificar el proyecto:

```powershell
npm run build
npm test
npm run start
```

Abrir http://localhost:4173 al usar `start`. El frontend se sirve con Vite Preview para demostración local; un despliegue público requiere un servidor de estáticos y un proxy `/api`. Si se ejecuta solamente el frontend, la API debe arrancarse en otra terminal para que funcionen las tareas.

## Uso real de la librería compartida

Ambas aplicaciones declaran `@hw/shared` como dependencia e importan por nombre del paquete.

- API: `apps/api/src/app.js` usa `validateTitle`, `STATUSES`, `summarize` y `APP_NAME`.
- Web: `apps/web/src/model.js` usa `validateTitle`, `STATUSES` y `summarize`; `main.js` usa `APP_NAME`.
- Cambiar la regla de 100 caracteres en `packages/shared/src/index.js` modifica la validación de las dos aplicaciones. El backend valida incluso si se omite el frontend.

## API

| Método | Ruta | Resultado |
| --- | --- | --- |
| GET | `/api/health` | Estado del servicio |
| GET | `/api/tasks` | Tareas y resumen |
| POST | `/api/tasks` | Crear con `{"title":"Estudiar"}`; responde 201 |
| PATCH | `/api/tasks/:id` | Cambiar con `{"status":"done"}` o `{"status":"pending"}` |
| DELETE | `/api/tasks/:id` | Eliminar; responde 204 |

Los títulos inválidos y estados desconocidos responden 400; identificadores inexistentes responden 404. Las tareas se guardan en memoria y se pierden al reiniciar la API. No hay autenticación: el alcance es una demostración académica local.

## Pruebas

Se usa el runner integrado `node:test`:

- Librería: entradas vacías, tipos incorrectos, longitud máxima y estadísticas.
- Frontend: normalización del payload y consumo de reglas compartidas.
- Backend: prueba HTTP real en puerto temporal que recorre salud, validación, creación, actualización, resumen y eliminación.

Las pruebas del frontend cubren su modelo, no automatización visual de navegador. GitHub Actions ejecuta instalación reproducible, build y pruebas en cada push o pull request.

## GitHub y Conventional Commits

Todo el trabajo de esta actividad está en la rama `hw-05`; las ramas de tareas anteriores se conservan. Para continuar después de clonar:

```powershell
git switch hw-05
# Realizar cambios, luego:
git add .
git commit -m "feat(web): add task filters"
git push origin hw-05
```

Formato: `tipo(alcance opcional): descripción`.

```text
feat(web): add task creation form
fix(api): reject invalid task status
test(shared): cover title length validation
docs: explain setup and workspace commands
chore: configure turbo tasks
```

Usar `git log --oneline` para revisar el historial. No subir `node_modules`, `dist`, `.turbo` ni secretos. El archivo `.gitignore` ya los excluye.

## Relación con la rúbrica

| Criterio | Evidencia |
| --- | --- |
| Organización 25% | `apps/`, `packages/`, npm workspaces y Turborepo |
| Aplicaciones 25% | Web y API conectadas; gestión de tareas |
| Librería 20% | Dependencia e imports compartidos en ambas aplicaciones |
| Comandos 20% | Instalación, ejecución, build y test desde la raíz |
| Documentación y commits 10% | Este README e historial Conventional Commits |

Entrega: https://github.com/Gorozco710/Tareas_Arq/tree/hw-05
