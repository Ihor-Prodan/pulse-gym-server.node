import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ where: { email } });
  
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

    res.status(200).json({ message: 'Authentication successful', token });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
