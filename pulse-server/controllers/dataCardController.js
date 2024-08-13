import { check, validationResult } from 'express-validator';
import crypto from 'crypto';
import dotenv from 'dotenv';
import User from '../models/User.js';
import DataCard from '../models/DataCard.js';

dotenv.config();

export const validateCardData = [
  check('cardNumber').isString(),
  check('cvv').isString(),
  check('date').isString(),
  check('phoneNumber').isString(),
  check('userId').isNumeric(),
];

export const encryptCardNumber = (cardNumber) => {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(cardNumber, 'utf8', 'hex');

  encrypted += cipher.final('hex');

  return encrypted;
};

export const decryptCardNumber = (encryptedCardNumber) => {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(encryptedCardNumber, 'hex', 'utf8');

  decrypted += decipher.final('utf8');

  return decrypted;
};

export const createCardData = [
  validateCardData,
  async (req, res) => {
    const errors = validationResult(req);

    console.log('Validation errors:', errors.array());

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userId, cardNumber, cvv, date, phoneNumber } = req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const existingCard = await DataCard.findOne({ where: { userId } });

      if (existingCard) {
        return res.status(400).json({ error: 'Card already exists for this user' });
      }

      const encryptedCardNumber = encryptCardNumber(cardNumber);
      const encryptedCvv = encryptCardNumber(cvv);

      const cardData = await DataCard.create({
        userId,
        cardNumber: encryptedCardNumber,
        cvv: encryptedCvv,
        date,
        phoneNumber,
      });

      res.status(201).json(cardData);

    } catch (error) {
      console.error('Error creating card data:', error);

      res.status(500).json({ error: 'Failed to create card data' });
    }
  }
];

export const getDecryptedCardData = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const cardData = await DataCard.findOne({ where: { userId } });

    if (!cardData) {
      throw new Error('Card data not found');
    }

    const decryptedCardData = {
      cardNumber: decryptCardNumber(cardData.cardNumber),
      cvv: decryptCardNumber(cardData.cvv),
      date: cardData.date,
      phoneNumber: cardData.phoneNumber,
      userId: cardData.userId,
    };

    return decryptedCardData;

  } catch (error) {
    console.error('Error retrieving card data:', error);

    throw new Error('Failed to retrieve card data');
  }
};