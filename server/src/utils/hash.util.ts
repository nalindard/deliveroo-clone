import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<{ passwordHash: string; passwordSalt: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { passwordHash: hash, passwordSalt: salt };
}
