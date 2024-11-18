import { Security } from './security';
import { User } from './../models/user.interface';
import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export class DatabaseHandler {
    private static connection: Connection;
    private static readonly databaseName: string = process.env.DB_NAME || 'PFM';
    private static readonly databaseHost: string = process.env.DB_HOST || 'localhost';
    private static readonly databaseUser: string = process.env.DB_USER || 'PAYNET_HACKATHON';
    private static readonly databasePassword: string = process.env.DB_PASSWORD || 'password';

    private static async connect(): Promise<Connection> {
        if (this.connection) return this.connection;

        // Establish connection to the database using environment variables
        this.connection = mysql.createConnection({
            host: this.databaseHost,
            user: this.databaseUser,
            password: this.databasePassword,
            database: this.databaseName,
        });

        // Test the connection
        await this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
            } else {
                console.log('Successfully connected to MySQL database');
            }
        });

        return this.connection;
    }

    private static async executeQuery(query: string, params: any[] = []): Promise<any> {
        try {
            // Await the connection and use it to execute the query
            const connection = await this.connect();

            // Use the query method and handle the result
            return new Promise<any>((resolve, reject) => {
                connection.execute(query, params, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        // If the result is an OkPacket, resolve it directly
                        if (result && (result as any).affectedRows !== undefined) {
                            resolve(result); // OkPacket for INSERT/UPDATE
                        } else {
                            resolve(result); // Query result for SELECT
                        }
                    }
                });
            });
        } catch (err) {
            console.error('Error executing query:', err);
            throw err; 
        }
    }




    private static async  closeConnection(): Promise<void> {
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

    public static async createUser(user: User): Promise<boolean> {
        const query = `
        INSERT INTO USER (NAME, EMAIL, PASSWORD, CREATEDAT) VALUES (?, ?, ?, NOW());
        `;

        const password = Security.hashPassword(user.password);
        const params = [user.name, user.email, password];

        try {
            // Use the improved executeQuery method
            const result = await this.executeQuery(query, params);
            console.log(`User with email ${user.email} has been successfully inserted.`);
            
            return true; // User inserted successfully
        } catch (error) {
            console.error('Error inserting user:', error);
            return false; // Failure to insert user
        }
    }
}