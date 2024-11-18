import { Router, Request, Response } from 'express';

import { User } from './../models/user.interface';
import { DatabaseHandler } from './../controllers/database_handler';

const router = Router();

/**
 * @swagger
 * /register:
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
router.post('/register', async (req: Request, res: Response): Promise<void> => {
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
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(500).json({ message: 'Error registering user' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
