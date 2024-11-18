import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!')
})

/**
 * Create
 */


/**
 * Delete
 */

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
