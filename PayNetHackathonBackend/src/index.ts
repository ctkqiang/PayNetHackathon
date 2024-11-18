import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; // To load environment variable
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import authentication from './routes/authentication.routes';

// Initialize dotenv to load environment variables from .env file
dotenv.config();

// Setup Swagger JSDoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for PAYNET HACKATHON (PFM)',
    },
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000; // Using environment variable for port

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Authentication routes
app.use('/api/auth', authentication);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);  // Logging the error for debugging

  // If the error is an instance of a known error, send a customized message
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
