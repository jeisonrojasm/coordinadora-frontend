README FRONT

<p align="center">
  <img src="https://coordinadora.com/wp-content/uploads/2023/03/logo-coordinadora.svg" width="500" alt="Coordinadora logo" />
</p>
# Coordinadora Frontend

Aplicación React para registrar, cotizar y rastrear envíos.

## Tecnologías
- React + Vite
- TypeScript
- Context API
- Material UI
- Socket.io-client
- JWT + localStorage

## ✅ Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- ✅ [*Git*](https://git-scm.com/)
- ✅ [*Docker* y Docker Compose](https://www.docker.com/get-started) instalados y en ejecución

## 📥 Obtener el proyecto

Clona el repositorio:

```bash
#Clona el repositorio
git clone https://github.com/jeisonrojasm/coordinadora-frontend.git
cd coordinadora-frontend
```

## Ejecutar
### 1. Levantar el entorno de desarrollo con Docker

Como esta aplicación está completamente dockerizada, no es necesario instalar Node.js, Vite ni dependencias manualmente en tu equipo. Basta con ejecutar el siguiente comando desde la raíz del proyecto para construir la imagen y levantar el contenedor del frontend:

```bash
docker-compose up --build
```

Este comando realizará las siguientes acciones:
  - Construirá la imagen de Docker definida en el `Dockerfile`, utilizando `node:20-alpine` como base.
  - Instalará automáticamente todas las dependencias declaradas en el `package.json`.
  - Montará el código fuente de tu máquina dentro del contenedor, lo que permite ver los cambios en tiempo real.
  - Iniciará el servidor de desarrollo de Vite con soporte para hot-reload, permitiendo actualizar la interfaz automáticamente ante cualquier cambio en los archivos `.tsx` o `.ts`.

Una vez finalizado el proceso, la aplicación web quedará disponible en:

```arduino
http://localhost:5173
```

Puedes abrir esa URL en tu navegador para ver la interfaz en ejecución.