import UserWorkouts from '../models/UserWorkouts.js';

export const bookingWorkout = async (req, res) => {
  try {
    const {
      time,
      name,
      studio,
      trainer,
      id,
      location,
      date,
      hard,
      userId,
    } = req.body;

    const book = await UserWorkouts.create({
      time,
      name,
      date,
      studio,
      trainer,
      id,
      location,
      date,
      hard,
      userId,
    });

    console.log(book, 'book');

    console.log('Booked workout:', book);
    return res.status(201).json(book);

  } catch (error) {
    console.error('Error booking workout:', error);

    return res.status(500).json({ error: 'Failed to booking workout' });
  }
};

export default bookingWorkout;