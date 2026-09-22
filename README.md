# Proyecto Django - Sistema E-Commerce & ERP (HW-03)

Este proyecto de Django implementa una arquitectura modular dividida en 5 aplicaciones (`users`, `inventory`, `orders`, `marketing`, `logistics`), utilizando un modelo base abstracto con UUIDv4, marcas de tiempo y soporte para *Soft Delete*.

## Prerrequisitos
* Python 3.10 o superior instalado.
* Git instalado.

## Instrucciones de Instalación y Ejecución

1. **Clonar el repositorio y cambiar a la rama de la tarea:**
bash
git clone https://github.com/Gorozco710/Tareas_Arq.git
cd Tareas_Arq
git checkout hw-03


2. **Crear y activar un entorno virtual:**
* En Windows (CMD / PowerShell):
bash
python -m venv venv
venv\Scripts\activate

* En macOS / Linux:
bash
python3 -m venv venv
source venv/bin/activate


3. **Instalar las dependencias (Django):**
bash
pip install django


4. **Navegar a la carpeta del proyecto y aplicar las migraciones:**
bash
cd core_project
python manage.py makemigrations users inventory orders marketing logistics
python manage.py migrate


5. **Ejecutar el servidor de desarrollo:**
bash
python manage.py runserver


6. Abre tu navegador y accede a `http://127.0.0.1:8000/` para verificar que el servidor de Django está corriendo correctamente.
