import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plainPass: string, hashedPass: string) => {
    return await bcrypt.compare(plainPass, hashedPass);
};