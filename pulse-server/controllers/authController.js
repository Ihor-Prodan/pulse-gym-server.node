import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Membership from '../models/membership.js';
import { getDecryptedCardData } from './dataCardController.js';
import UserWorkouts from '../models/UserWorkouts.js';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;

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

    const membership = await Membership.findOne({ where: { userId: user.id } });
    const bookingWorkouts = await UserWorkouts.findAll({
      where: { userId: user.id },
    });

    let decryptedCardData = null;

    const userBookingWorkouts = bookingWorkouts.map((workout) => ({
      id: workout.getDataValue('workoutId'),
      time: workout.getDataValue('time'),
      name: workout.getDataValue('name'),
      studio: workout.getDataValue('studio'),
      trainer: workout.getDataValue('trainer'),
      location: workout.getDataValue('location'),
      date: workout.getDataValue('date'),
      hard: workout.getDataValue('hard'),
    }));

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
      token: token,
      user: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        membership: membership || null,
        dataCard: decryptedCardData || null,
        workouts: userBookingWorkouts || [],
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    const membership = await Membership.findOne({ where: { userId: user.id } });
    const bookingWorkouts = await UserWorkouts.findAll({
      where: { userId: user.id },
    });

    let decryptedCardData = null;

    const userBookingWorkouts = bookingWorkouts.map((workout) => ({
      id: workout.getDataValue('workoutId'),
      time: workout.getDataValue('time'),
      name: workout.getDataValue('name'),
      studio: workout.getDataValue('studio'),
      trainer: workout.getDataValue('trainer'),
      location: workout.getDataValue('location'),
      date: workout.getDataValue('date'),
      hard: workout.getDataValue('hard'),
    }));

    try {
      decryptedCardData = await getDecryptedCardData(user.id);
    } catch {
      decryptedCardData = null;
    }

    return res.status(200).json({
      token: token,
      user: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        membership: membership || null,
        dataCard: decryptedCardData || null,
        workouts: userBookingWorkouts || [],
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);

    return res.status(500).json({ message: error.message });
  }
};
