import bcrypt from 'bcrypt';

export class Security {
    public static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        return hashedPassword;
    }

    /**
     * @public
     * @static
     * @param {string} plaintextPassword - The plaintext password provided by the user.
     * @param {string} hashedPassword - The hashed password stored in the database.
     * @returns {Promise<boolean>} Returns `true` if the password matches, otherwise `false`.
     * @description Verifies if the provided plaintext password matches the hashed password.
     */
    public static async verifyPassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
        // Compare the plaintext password with the hashed password
        const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
        return isMatch;
    }
}