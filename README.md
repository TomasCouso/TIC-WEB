# 📊 Aplicación Web para la Oficina de TIC - INSPT UTN

### Proyecto desarrollado con el stack MERN (MongoDB, Express, React, Node.js)

## 📋 Introducción

La oficina de Tecnologías de la Información y Comunicación (TIC) en la INSPT desempeña un papel fundamental en el soporte y mantenimiento de la infraestructura tecnológica. Este proyecto tiene como objetivo principal facilitar la gestión interna de TIC, mejorando la eficiencia operativa y proporcionando un acceso rápido y conveniente a información y recursos tanto para empleados como para la comunidad estudiantil.

## 🎯 Objetivos

- **Optimizar la gestión de tareas y materiales** de la oficina de TIC.
- **Proveer acceso rápido** a instructivos, noticias y solicitudes.
- **Mantener informada a la comunidad** sobre noticias, eventos y temas relevantes mediante un sitio dinámico y actualizado.

## 🛠️ Funcionalidades y Estructura de la Aplicación

### 🌐 Landing Page

- **Descripción:** Página principal con diseño alineado a la facultad, enfocada en información relevante de la oficina de TIC.
- **Características:**

  - Información actualizada en tiempo real.
  - Acceso a instructivos generales y sección de misión y visión.

  ### 📰 Noticias

- **Descripción:** Sección pública con las últimas publicaciones de la facultad.
- **Características:**
  - Se mostrarán las ultimas noticias, eventos, etc de la facultad.

### 📑 Instructivos

- **Descripción:** Repositorio de instructivos accesible para empleados y estudiantes.
- **Características:**
  - Clasificación por temas o categorías.
  - Opciones de descarga en PDF.

### 🔒 Instructivos Específicos (Empleados)

- **Descripción:** Instructivos técnicos exclusivos para el uso interno de TIC.
- **Características:**
  - Acceso restringido mediante autenticación.
  - Clasificación por categorías.

### 📋 Vista de Tareas Pendientes (Empleados)

- **Descripción:** Sección exclusiva para empleados donde se visualizan tareas asignadas.
- **Características:**
  - Lista de tareas con opción para marcar como completadas.
  - Posibilidad de agregar notas y comentarios a cada tarea.

### 📦 Pedidos de Materiales Realizados (Empleados)

- **Descripción:** Historial de pedidos de materiales con su estado actual.
- **Características:**
  - Filtro por fecha.
  - Detalle del contenido de cada pedido.

### 🛠️ Apartado de Service de Máquinas (Empleados)

- **Descripción:** Gestión de mantenimiento de las máquinas de la facultad.
- **Características:**
  - Registro de ID de máquina, tipo de servicio, técnico responsable y fecha.

### 📝 Creación de Solicitudes Rápidas

- **Descripción:** Herramienta para solicitudes predefinidas dirigidas a TIC.
- **Características:**
  - Requiere inicio de sesión.
  - Modelos de solicitud según tipo de requerimiento.

### 📦 Stock de Materiales (Empleados)

- **Descripción:** Módulo para consultar el stock de materiales en tiempo real.
- **Características:**
  - Información actualizada del inventario.
  - Opciones para realizar pedidos o actualizar el stock.

## 🚀 Tecnologías y Herramientas

- **Frontend:** React, HTML, CSS.
- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB
- **API Externas:** Instagram API de microsoft para el login de usuarios y de instagram para la integración de noticias.

## 📜 Configuración

1. **Configurar variables de entorno:** Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
PORT = 3000
MONGODB_URI= "La URI de la base de datos en mongo atlas"
CLIENT_ID= "El CLIENT_ID de la aplicación de Microsoft"
CLIENT_SECRET= "El CLIENT_SECRET de la aplicación de Microsoft"
TENANT_ID= "El TENANT_ID de la aplicación de Microsoft"
REDIRECT_URI= "El REDIRECT_URI de la aplicación de Microsoft"
JWT_SECRET= "La clave secreta para el JWT"
```

## Documentación de la API

Para consultar todos los endpoints y detalles técnicos de esta API, puedes acceder a [la documentación completa en Postman](https://documenter.getpostman.com/view/34266034/2sAY4ye1SY).
