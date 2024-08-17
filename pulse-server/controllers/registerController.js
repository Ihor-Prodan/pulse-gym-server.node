import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import { JWT_SECRET } from './authController.js';
import jwt from 'jsonwebtoken';
import UserWorkouts from '../models/UserWorkouts.js';
import { getDecryptedCardData } from './dataCardController.js';
import Membership from '../models/membership.js';

export const validateRegistration = [
  body('firstName').isString().notEmpty().withMessage('First name is required'),
  body('lastName').isString().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    const membership = await Membership.findOne({ where: { userId: newUser.id } });
    const bookingWorkouts = await UserWorkouts.findAll({ where: { userId: newUser.id } });

    let decryptedCardData = null;
    const userBookingWorkouts = bookingWorkouts.map(workout => ({
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
      decryptedCardData = await getDecryptedCardData(newUser.id);
    } catch {
      decryptedCardData = null;
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        userId: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        membership: membership || null,
        dataCard: decryptedCardData || null,
        workouts: userBookingWorkouts || [],
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};