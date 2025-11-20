<p align="center">
  <img src="https://coordinadora.com/wp-content/uploads/2023/03/logo-coordinadora.svg" width="500" alt="Coordinadora logo" />
</p>

# Coordinadora Frontend

Web interface built with React and Material UI for quoting, creating, and tracking shipments in real time. The app uses JWT for authentication, Context API for global state management, and WebSockets to provide dynamic updates on shipment statuses.

> ⚠️ **Note: The frontend requires the [*coordinadora-backend*](https://github.com/jeisonrojasm/coordinadora-backend) application to be running in order to make API requests.**

## 🛠️ Built with

- React + Vite
- TypeScript
- Context API
- Material UI
- Socket.io-client
- JWT + localStorage

## ✅ Prerequisites

Before getting started, make sure you have the following installed:

- ✅ [*Git*](https://git-scm.com/)
- ✅ [*Docker* y Docker Compose](https://www.docker.com/get-started) installed and running

## 📥 Get the project

Clone the repository:

```bash
#Clone the repository:
git clone https://github.com/jeisonrojasm/coordinadora-frontend.git
cd coordinadora-frontend
```

## 📁 Project Structure

The Coordinadora frontend is built with React + TypeScript and follows a modular, scalable structure. Vite is used as the bundler, along with best practices to facilitate maintenance, testing, and component reusability.

```bash
coordinadora-frontend/
├── public/                  # Public files (favicon, index.html)
├── src/                     # Frontend source code
│   ├── components/          # Reusable UI components
│   │   └── Button/          # Example of an atomic component
│   │       ├── Button.tsx
│   │       ├── Button.css
│   │       ├── ButtonTypes.ts
│   │       └── Button.test.tsx
│   ├── context/             # Global contexts (e.g., authentication, user state)
│   │   ├── DataContext.tsx
│   │   └── DataTypes.ts
│   ├── hooks/               # Reusable custom hooks
│   │   └── useModal.ts
│   ├── utils/               # Utility functions and schemas
│   │   ├── functions.ts
│   │   ├── queries.ts        # Functions that consume the backend API
│   │   └── global-schemas.ts
│   ├── views/               # Page views (grouped by route or flow)
│   │   └── SignIn/
│   │       ├── SignIn.tsx
│   │       ├── SignIn.css
│   │       ├── SignInFunctions.ts
│   │       ├── SignInTypes.ts
│   │       ├── SignInSchemas.ts
│   │       └── SignIn.test.tsx
│   ├── App.tsx              # Root component of the app
│   ├── App.css              # Global styles of the app
│   ├── main.tsx             # Main entry point
│   └── index.css            # Base/global styles
├── .env                     # Environment variables for development (not versioned)
├── .gitignore               # Files and folders ignored by Git
├── .dockerignore            # Files ignored by Docker
├── Dockerfile               # Frontend production image
├── docker-compose.yml       # Local orchestration of frontend and backend
├── index.html               # Base HTML file (used by Vite)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

### 🧱 Module conventions

Each module in `views/` and `components/` follows a file-based separation pattern to maintain a clean and scalable architecture:

| File              | Purpose                                                       |
|-------------------|---------------------------------------------------------------|
| `*.tsx`           | Main component (view or reusable UI)                          |
| `*.css`           | Component- or view-specific styles                            |
| `*Types.ts`       | Typing of component props, state, and structures              |
| `*Functions.ts`   | Module-specific helper functions                              |
| `*Schemas.ts`     | Form validations with Zod or other libraries                  |
| `*.test.tsx`      | Unit tests using Jest and React Testing Library               |

## 🚀 Run

### 1. **`.env` file required**

Normally, the `.env` file **should not be included** in a public repository, as it may contain sensitive configuration values.
However, for demonstration and evaluation purposes —and because this is not a production project— the `.env` file is included in the repository so anyone can run the project without additional setup.

You will find the `.env` file already placed in the root of the project.

### 2. Set up the development environment with Docker

Since this application is fully dockerized, there is no need to manually install Node.js, Vite, or dependencies on your machine. Simply run the following command from the project root to build the image and start the frontend container:

```bash
docker-compose up --build
```

This command will perform the following actions:

- It will build the Docker image defined in the `Dockerfile`, using `node:20-alpine` as the base.
- It will automatically install all dependencies declared in the `package.json`.
- It will mount the source code from your machine into the container, allowing you to see changes in real time.
- It will start the Vite development server with hot-reload support, allowing the interface to automatically update whenever any `.tsx` or `.ts` files change.

## ✅ Application ready to use

Once the previous steps are completed:

- The frontend application will be running at [`http://localhost:5173/`](http://localhost:5173/).
- The connection to the backend will already be established through the variable `VITE_HOST`.
- You will be able to log in, create quotes, register shipments, and track them in real time.
- The socket-based update system will be active and functional.

> 🧪 You can access `http://localhost:5173/` from your browser and start interacting with the interface.

## 🧪 Automated tests

The project includes unit tests for components and views, using [Jest](https://jestjs.io/) along with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). These tests ensure that the interface components behave correctly under different scenarios.

### Test structure

The tests are organized in the same directories as their corresponding components and views:

```bash
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx       👈 Reusable button tests

├── views/
│   └── SignIn/
│       ├── SignIn.tsx
│       └── SignIn.test.tsx       👈 Login view tests
```

Each `*.test.tsx` file contains tests focused on:

- Validate the correct rendering of elements.
- Check interactions such as clicks or form submissions.
- Verify accessibility conditions (e.g., disabled elements).
- Ensure that associated functions are triggered (onClick, onChange, etc.).

Basic example:

```tsx
test('should render the text correctly', () => {
  render(<Button text="Enviar" />)
  const button = screen.getByRole('button', { name: 'Send' })
  expect(button).toBeInTheDocument()
})
```

### Run the tests

To run all tests:

```bash
npm run test
```

> 📦 Make sure to have the development dependencies (`jest`, `@testing-library/react`, `@testing-library/jest-dom`) installed before running the tests.

## 👨‍💻 Author

Developed by **Jeison Rojas Mora** - *Fullstack Developer*

- [https://github.com/jeisonrojasm](https://github.com/jeisonrojasm)
- [https://www.linkedin.com/in/jeison-rojas-mora/](https://www.linkedin.com/in/jeison-rojas-mora/)