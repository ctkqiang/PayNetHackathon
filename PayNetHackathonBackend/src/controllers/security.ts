import bcrypt from 'bcrypt';

export class Security {
    public static hashPassword(password: string): Promise<string> | null {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        return hashedPassword;
    }
}