import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Membership from '../models/Membership.js';
import { getDecryptedCardData } from './dataCardController.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }});
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    const membership = await Membership.findOne({ where: { userId: user.id } });
    let decryptedCardData = null;
    try {
      decryptedCardData = await getDecryptedCardData(user.id);
    } catch {
      decryptedCardData = null;
    }
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    return res.status(200).json({
      message: 'Authentication successful',
      user: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        membership: membership || null,
        dataCard: decryptedCardData || null,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      console.log('User not found');
      return null;
    }
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
  }
};

