import Membership from '../models/Membership.js';
import User from '../models/User.js';

export const createMembership = async (req, res) => {
  try {
    const {
      membershipId,
      duration,
      date,
      giveOne,
      giveTwo,
      giveThree,
      slogan,
      access,
      unlimited,
      locker,
      price,
      best,
    } = req.body;

    const userId = membershipId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const membership = await Membership.create({
      userId,
      duration,
      date,
      giveOne,
      giveTwo,
      giveThree,
      slogan,
      access,
      unlimited,
      locker,
      price,
      best,
    });

    console.log('Membership created:', membership);
    res.status(201).json(membership);
  } catch (error) {
    console.error('Error creating membership:', error);

    res.status(500).json({ error: 'Failed to create membership' });
  }
};

export const getMembershipById = async (id) => {
  try {
    const membership = await Membership.findByPk(id);

    console.log('Membership found:', membership);
  } catch (error) {
    console.error('Error finding membership:', error);
  }
};
