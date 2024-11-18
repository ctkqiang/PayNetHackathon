Here’s how to reference your MySQL setup in the **README.md** at the root:

---

# PayNetHackathonBackend

A backend service for the PayNet Hackathon, built with **Express.js** and **TypeScript** to provide robust and scalable APIs for managing personal financial data and solutions.

---

## Features

- Built with **Express.js** and **TypeScript**.
- Implements RESTful APIs.
- Structured for scalability and maintainability.

---

## Requirements

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- **MySQL** for database operations.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/PayNetHackathonBackend.git
cd PayNetHackathonBackend
```

### 2. Install Dependencies

```bash
npm install
```

or, if you prefer **Yarn**:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the necessary environment variables. Example:

```env
PORT=3000
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
```

### 4. Set Up MySQL User and Database

Refer to the [MySQL Setup Guide](./scripts/README.md) in the `script/` folder for instructions on setting up the database user, permissions, and connection.

### 5. Build the Project

Compile the TypeScript code to JavaScript:

```bash
npm run build
```

or:

```bash
yarn build
```

### 6. Run the Project

- For development with hot reloading:

  ```bash
  npm run dev
  ```

  or:

  ```bash
  yarn dev
  ```

- For production:
  ```bash
  npm start
  ```
  or:
  ```bash
  yarn start
  ```

---

## Scripts

| Script          | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Runs the app in development mode with hot reload |
| `npm run build` | Compiles TypeScript to JavaScript                |
| `npm start`     | Runs the compiled JavaScript code in production  |

---

## Folder Structure

```
PayNetHackathonBackend/
├── src/
│   ├── routes/       # API route handlers
│   ├── controllers/  # Logic for handling API requests
│   ├── models/       # Database models
│   ├── utils/        # Utility functions
│   └── index.ts      # Application entry point
├── dist/             # Compiled JavaScript output
├── script/           # Database setup scripts
│   ├── create_user.sql
│   └── README.md      # MySQL setup guide
├── .env              # Environment configuration file
├── tsconfig.json     # TypeScript configuration
├── package.json      # Project metadata and scripts
```

