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

## 📁 Estructura del Proyecto

El frontend de Coordinadora está construido con React + TypeScript, y sigue una estructura modular y escalable. Se utiliza Vite como bundler, junto con buenas prácticas para facilitar el mantenimiento, pruebas y reutilización de componentes.

```bash
coordinadora-frontend/
├── public/                  # Archivos públicos (favicon, index.html)
├── src/                     # Código fuente del frontend
│   ├── components/          # Componentes reutilizables de UI
│   │   └── Button/          # Ejemplo de componente atómico
│   │       ├── Button.tsx
│   │       ├── Button.css
│   │       ├── ButtonTypes.ts
│   │       └── Button.test.tsx
│   ├── context/             # Contextos globales (ej. autenticación, estado de usuario)
│   │   ├── DataContext.tsx
│   │   └── DataTypes.ts
│   ├── hooks/               # Hooks personalizados reutilizables
│   │   └── useModal.ts
│   ├── utils/               # Funciones utilitarias y esquemas
│   │   ├── functions.ts
│   │   ├── queries.ts        # Funciones que consumen la API del backend
│   │   └── global-schemas.ts
│   ├── views/               # Vistas de páginas (agrupadas por ruta o flujo)
│   │   └── SignIn/
│   │       ├── SignIn.tsx
│   │       ├── SignIn.css
│   │       ├── SignInFunctions.ts
│   │       ├── SignInTypes.ts
│   │       ├── SignInSchemas.ts
│   │       └── SignIn.test.tsx
│   ├── App.tsx              # Componente raíz de la app
│   ├── App.css              # Estilos globales de la app
│   ├── main.tsx             # Punto de entrada principal
│   └── index.css            # Estilos base/globales
├── .env                     # Variables de entorno para desarrollo (no versionado)
├── .gitignore               # Archivos y carpetas ignoradas por Git
├── .dockerignore            # Archivos ignorados por Docker
├── Dockerfile               # Imagen de frontend para producción
├── docker-compose.yml       # Orquestación local de frontend y backend
├── index.html               # Archivo base HTML (usado por Vite)
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript
└── README.md                # Documentación del proyecto
```

### 🧱 Convenciones por módulo

Cada módulo en `views/` y `components/` sigue un patrón de separación por archivo para mantener una arquitectura limpia y escalable:

| Archivo           | Propósito                                                     |
|-------------------|---------------------------------------------------------------|
| `*.tsx`           | Componente principal (vista o UI reusable)                    |
| `*.css`           | Estilos específicos del componente o vista                    |
| `*Types.ts`       | Tipado de props, estados y estructuras del componente         |
| `*Functions.ts`   | Funciones auxiliares específicas del módulo                   |
| `*Schemas.ts`     | Validaciones con Zod u otras librerías para formularios       |
| `*.test.tsx`      | Pruebas unitarias usando Jest y React Testing Library         |

## 🚀 Ejecutar

### 1. **Archivo `.env` requerido**

El archivo `.env` contiene variables necesarias para el correcto funcionamiento del proyecto frontend, como la URL base del backend.

Por seguridad y buenas prácticas, **este archivo no está incluido en el repositorio**.

> 🔐 **En el correo que te llegó encontrarás el archivo `.env` necesario para ejecutar el frontend correctamente.**

Una vez lo tengas, colócalo en la raíz del proyecto.

### 2. Levantar el entorno de desarrollo con Docker

Como esta aplicación está completamente dockerizada, no es necesario instalar Node.js, Vite ni dependencias manualmente en tu equipo. Basta con ejecutar el siguiente comando desde la raíz del proyecto para construir la imagen y levantar el contenedor del frontend:

```bash
docker-compose up --build
```

Este comando realizará las siguientes acciones:

- Construirá la imagen de Docker definida en el `Dockerfile`, utilizando `node:20-alpine` como base.
- Instalará automáticamente todas las dependencias declaradas en el `package.json`.
- Montará el código fuente de tu máquina dentro del contenedor, lo que permite ver los cambios en tiempo real.
- Iniciará el servidor de desarrollo de Vite con soporte para hot-reload, permitiendo actualizar la interfaz automáticamente ante cualquier cambio en los archivos `.tsx` o `.ts`.

## ✅ Aplicación lista para usarse

Una vez completados los pasos anteriores:

- La aplicación frontend estará corriendo en [`http://localhost:5173/`](http://localhost:5173/).
- Ya se habrá establecido la conexión con el backend a través de la variable `VITE_HOST`.
- Podrás iniciar sesión, crear cotizaciones, registrar envíos y realizar seguimiento en tiempo real.
- El sistema de actualización por sockets estará activo y funcional.

> 🧪 Puedes acceder desde tu navegador a `http://localhost:5173/` y comenzar a interactuar con la interfaz.

## 🧪 Pruebas automatizadas

El proyecto incluye pruebas unitarias para componentes y vistas, utilizando [Jest](https://jestjs.io/) junto con [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Estas pruebas garantizan que los componentes de la interfaz se comporten correctamente frente a diferentes escenarios.

### Estructura de pruebas

Las pruebas están organizadas en los mismos directorios que los componentes y vistas correspondientes:

```bash
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx       👈 Pruebas del botón reutilizable

├── views/
│   └── SignIn/
│       ├── SignIn.tsx
│       └── SignIn.test.tsx       👈 Pruebas de la vista de inicio de sesión
```

Cada archivo `*.test.tsx` contiene pruebas enfocadas en:

- Validar el renderizado correcto de los elementos.
- Comprobar interacciones como clics o envíos de formularios.
- Verificar condiciones de accesibilidad (como elementos deshabilitados).
- Asegurar que se disparen funciones asociadas (onClick, onChange, etc.).

Ejemplo básico:

```tsx
test('debe renderizar el texto correctamente', () => {
  render(<Button text="Enviar" />)
  const button = screen.getByRole('button', { name: 'Enviar' })
  expect(button).toBeInTheDocument()
})
```

### Ejecutar los tests

Para correr todas las pruebas:

```bash
npm run test
```

> 📦 Asegúrate de tener instaladas las dependencias de desarrollo (`jest`, `@testing-library/react`, `@testing-library/jest-dom`) antes de ejecutar los tests.

## 👨‍💻 Autor

Desarrollado por **Jeison Rojas** - *Desarrollador Fullstack* - [jeisonrojasm](https://github.com/jeisonrojasm)