import Membership from '../models/Membership.js';

export const createMembership = async (membershipData) => {
  console.log(membershipData);
  try {
    const membership = await Membership.create(membershipData);
    console.log('Membership created:', membership);
  } catch (error) {
    console.error('Error creating membership:', error);
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