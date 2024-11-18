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

    private static connect(): Connection {
        if (this.connection) return this.connection;

        // Establish connection to the database using environment variables
        this.connection = mysql.createConnection({
            host: this.databaseHost,
            user: this.databaseUser,
            password: this.databasePassword,
            database: this.databaseName,
        });

        // Test the connection
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err.message);
            } else {
                console.log('Successfully connected to MySQL database');
            }
        });

        return this.connection;
    }

    private static executeQuery(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connect().query(query, params, (err, results) => {
                if (err) {
                    console.error('Error executing query:', err.message);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    private static closeConnection(): void {
        if (this.connection) {
            this.connection.end((err) => {
                if (err) {
                    console.error('Error closing MySQL connection:', err.message);
                } else {
                    console.log('MySQL connection closed');
                }
            });
        }
    }

    public static createUser(user: User): Promise<bool> {
        const query = `
        INSERT INTO USER (NAME, EMAIL, PASSWORD, CREATEDAT) VALUES (?, ?, ?, NOW());
        `;

        const password = Security.hashPassword(user.password);
        const params = [user.name, user.email, password];

        return new Promise((resolve, reject) => {
            this.executeQuery(query, params)
                .then((result) => {
                    console.log(`User with email ${email} has been successfully inserted.`);
                    resolve(true);
                })
                .catch((error) => {
                    console.error('Error inserting user:', error.message);
                    reject(false);
                });
        });
    } 
}