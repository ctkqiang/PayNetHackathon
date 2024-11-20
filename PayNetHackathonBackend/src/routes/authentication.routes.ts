import { Router, Request, Response, NextFunction } from 'express';

import { User } from './../models/user.interface';
import { DatabaseHandler } from './../controllers/database_handler';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registers a new user
 *     description: Registers a new user in the system
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: The user information
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    // Validation for required fields
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Name, email, and password are required' });
        return;  // No need to return a response, just return void
    }

    // Additional validation for email format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
    }

    // Password strength validation (example: at least 8 characters)
    if (password.length < 8) {
        res.status(400).json({ message: 'Password must be at least 8 characters long' });
        return;
    }

    const user: User = {
        id: null,
        name,
        email,
        password,
        createdAt: new Date(),
    };

    try {
        // Insert user into the database and check if user was successfully created
        const result = await DatabaseHandler.createUser(user);

        if (result) {
            console.info(`[x] POST:api/auth/register: User registered successfully`)

            res.status(201).json({ message: 'User registered successfully' });
            return;
        } else {
            console.warn(`[x] POST:api/auth/register: User Already Registered`)

            res.status(500).json({ message: 'User Already Registered' });
            return;
        }

    } catch (error) {
        console.error(`[x] POST:api/auth/register: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user using their email and password.
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: The user's login credentials.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: The user's email address.
 *               example: user@example.com
 *             password:
 *               type: string
 *               format: password
 *               description: The user's password.
 *               example: securePassword123
 *     responses:
 *       201:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully Login
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-18T10:15:30Z
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: Internal server error or authentication failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error authenticate user
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction ) => {
    const { email, password } = req.body;

    const user = await DatabaseHandler.getNameByEmailAndPassword(email, password);

    try {
        if (user) {
            console.info(`[x] POST:api/auth/login: ${user} login successfully.`);

            res.status(201).json({ message: 'User successfully Login', data: user});
            return;
        }

        res.status(401).json({ message: 'Invalid credentials or account does not exist' });
        console.warn(`[x] POST:api/auth/login: 'Invalid credentials or account does not exist ${user}`)
        return;
    } catch (error) {
        console.error(`[x] POST:api/auth/login: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }

});

/**
 * @swagger
 * /api/auth/delete/user/{email}:
 *   delete:
 *     summary: Delete a user by email
 *     description: Deletes a user account from the database by their email address. The request must include the user's password for authentication.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user to be deleted.
 *         schema:
 *           type: string
 *       - in: body
 *         name: password
 *         description: The user's password for authentication.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: "user_password123"
 *     responses:
 *       201:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       500:
 *         description: Error deleting user or internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting user"
 */
router.delete('/delete/user/:email', async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email;
    const password = req.body.password;

    const deletion = await DatabaseHandler.deleteUser(email, password);
    
    try {
        if (deletion) {
            console.info(`[x] DELETE:api/auth/delete/user/:email: User deleted successfully`);
            res.status(201).json({ message: 'User deleted successfully' });
            return;
        }
        
        console.warn(`[x] DELETE:api/auth/delete/user/:email: Error deleting user`);

        res.status(500).json({ message: 'Error deleting user' });
        return;
    } catch(error) {
        console.error(`[x] DELETE:api/auth/delete/user/:email: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }
});

// TODO request password reset + email confirmation

export default router;
