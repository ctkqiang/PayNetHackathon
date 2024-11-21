import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; // To load environment variable
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import authentication from './routes/authentication.routes';
import mock_data from './routes/mock_data.routes';

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
  explorer: true
};

const swaggerSpec = swaggerJsdoc(options);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000; // Using environment variable for port

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const log = (res: Response, method: string, endpoint: string) => {
  console.info(`[x] Status: ${res.statusCode} | Method: [${method}] | Endpoint: ${endpoint}`);
};

// Root route for testing
const quotes = [
  'The only way to do great work is to love what you do.” — Steve Jobs',
  'Success is not final, failure is not fatal: It is the courage to continue that counts.” — Winston Churchill',
  'It always seems impossible until it’s done.” — Nelson Mandela',
  'Believe you can and you’re halfway there.” — Theodore Roosevelt',
  'You miss 100% of the shots you don’t take.” — Wayne Gretzky'
];

app.get('/', (req: Request, res: Response) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  log(res, 'GET', '/');

  res.send(`
    <h1>Here’s a motivational quote for you:</h1>
    <blockquote>${randomQuote}</blockquote>
    <p>Have a great day!</p>
  `);
});

app.use('/api/auth', authentication);
app.use('/api/mock', mock_data);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[x] Error captured by global error handler:', err);

  if (res.headersSent) return next(err); // If headers have already been sent, pass the error to next middleware

  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    console.info(`[x] Status: ${res.statusCode} | Method: [${req.method}] | Endpoint: ${req.originalUrl}`);
  });
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`[x] Server is running on http://localhost:${PORT}`);
});
