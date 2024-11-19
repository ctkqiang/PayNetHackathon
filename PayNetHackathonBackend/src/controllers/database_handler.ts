import { Security } from './security';
import { User } from './../models/user.interface';
import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';


// Initialize dotenv to load environment variables from .env file
dotenv.config();

/**
 * @class DatabaseHandler
 * @description Handles MySQL database operations, including establishing connections, 
 * executing queries, and performing CRUD operations for users.
 */
export class DatabaseHandler {
    /**
     * @private
     * @static
     * @type {Connection}
     * @description MySQL database connection instance.
     */
    private static connection: Connection;

    /**
     * @private
     * @static
     * @type {string}
     * @description Name of the database. Defaults to 'PFM' if not specified in environment variables.
     */
    private static readonly databaseName: string = process.env.DB_NAME || 'PFM';

    /**
     * @private
     * @static
     * @type {string}
     * @description Host of the database. Defaults to 'localhost' if not specified in environment variables.
     */
    private static readonly databaseHost: string = process.env.DB_HOST || 'localhost';

    /**
     * @private
     * @static
     * @type {string}
     * @description Database username. Defaults to 'PAYNET_HACKATHON' if not specified in environment variables.
     */
    private static readonly databaseUser: string = process.env.DB_USER || 'PAYNET_HACKATHON';

    /**
     * @private
     * @static
     * @type {string}
     * @description Database password. Defaults to 'password' if not specified in environment variables.
     */
    private static readonly databasePassword: string = process.env.DB_PASSWORD || 'password';

    /**
     * @private
     * @static
     * @async
     * @returns {Promise<Connection>}
     * @description Establishes a connection to the MySQL database if not already connected.
     */
    private static async connect(): Promise<Connection> {
        if (this.connection) return this.connection;

        this.connection = mysql.createConnection({
            host: this.databaseHost,
            user: this.databaseUser,
            password: this.databasePassword,
            database: this.databaseName,
        });

        await this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
            } else {
                console.log('Successfully connected to MySQL database');
            }
        });

        return this.connection;
    }

    /**
     * @private
     * @static
     * @async
     * @param {string} query - SQL query string to execute.
     * @param {any[]} [params=[]] - Parameters to bind in the query.
     * @returns {Promise<any>} Result of the SQL query execution.
     * @description Executes a MySQL query using the established connection.
     * Throws an error if the query fails.
     */
    private static async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            const connection = await this.connect();

            return new Promise<any>((resolve, reject) => {
                connection.execute(query, params, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result && (result as any).affectedRows !== undefined) {
                            resolve(result); // For INSERT/UPDATE
                        } else {
                            resolve(result); // For SELECT
                        }
                    }
                });
            });
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    /**
     * @private
     * @static
     * @async
     * @returns {Promise<void>}
     * @description Closes the MySQL database connection if it is open.
     */
    private static async closeConnection(): Promise<void> {
        if (this.connection) {
            this.connection.end((err) => {
                if (err) {
                    console.error('Error closing MySQL connection:', err);
                } else {
                    console.log('MySQL connection closed');
                }
            });
        }
    }

    /**
     * @public
     * @static
     * @async
     * @param {User} user - User object containing name, email, and password.
     * @returns {Promise<boolean>} Returns `true` if the user is successfully created, `false` otherwise.
     * @description Creates a new user in the database. Hashes the password before storing it.
     */
    public static async createUser(user: User): Promise<boolean> {
        const query = `
        INSERT INTO USER (NAME, EMAIL, PASSWORD, CREATEDAT) VALUES (?, ?, ?, NOW());
        `;

        const password = Security.hashPassword(user.password);
        const params = [user.name, user.email, password];

        try {
            const result = await this.executeQuery(query, params);
            console.log(`User with email ${user.email} has been successfully inserted.`);
            return true;
        } catch (error) {
            console.error('Error inserting user:', error);
            return false;
        }
    }

    /**
     * @public
     * @static
     * @async
     * @param {string} email - Email of the user to retrieve.
     * @param {string} password - Plaintext password of the user to validate.
     * @returns {Promise<string | null>} Returns the user's name if credentials are valid, otherwise `null`.
     * @description Retrieves a user's name based on their email and password.
     */
    public static async getNameByEmailAndPassword(email: string, password: string): Promise<string | null> {
        const query = `
        SELECT NAME, PASSWORD
        FROM USER 
        WHERE EMAIL = ?;
        `;

        try {
            const result = await this.executeQuery(query, [email]);

            // If user exists, validate the password
            if (Array.isArray(result) && result.length > 0) {
                const userRow = result[0] as any;

                // Compare the provided password with the stored hashed password
                const isPasswordValid = await Security.verifyPassword(password, userRow.PASSWORD);

                if (isPasswordValid) {
                    return userRow.NAME; // Return the user's name
                }
            }

            // Return null if no user is found or password is invalid
            return null;
        } catch (error) {
            console.error('Error fetching user by email and password:', error);
            throw error; // Propagate error for higher-level handling
        }
    }

}
