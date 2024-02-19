const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 */

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        const token = jsonwebtoken.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};
/**
 * @desc    Authenticate user and return token
 * @route   POST /auth/login
 */

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Invalid email or password' });

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jsonwebtoken.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({ token });
};

module.exports = {
    register,
    login,
};
