import { validationResult } from 'express-validator';
import DataCard from '../models/DataCard.js';
import User from '../models/User.js';
import { decryptCardNumber, encryptCardNumber, validateCardData } from './dataCardController.js';

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    return res.status(200).json({ message: 'User data update', user });

  } catch (error) {
    console.error('Error update data:', error);

    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateCardData = [
  validateCardData,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { cardNumber, cvv, date, phoneNumber, userId } = req.body;

      let cardData = await DataCard.findOne({ where: { userId } });

      if (!cardData) {
        return res.status(404).json({ message: 'Card data not found' });
      }

      cardData.cardNumber = encryptCardNumber(cardNumber || decryptCardNumber(cardData.cardNumber));
      cardData.cvv = encryptCardNumber(cvv || decryptCardNumber(cardData.cvv));
      cardData.date = date || cardData.date;
      cardData.phoneNumber = phoneNumber || cardData.phoneNumber;

      await cardData.save();

      res.status(200).json({ message: 'Card data updated successfully', cardData });

    } catch (error) {
      console.error('Error updating card data:', error);

      res.status(500).json({ message: 'Server error' });
    }
  }
];


