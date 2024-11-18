import bcrypt from 'bcrypt';

export class Security {
    public static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        return hashedPassword;
    }
}