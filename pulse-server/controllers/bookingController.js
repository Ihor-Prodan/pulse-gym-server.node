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

    const isBookedWorkout = await UserWorkouts.findOne({
      where: {
        workoutId: id,
        userId: userId,
      },
    });

    if (isBookedWorkout) {
      return res.status(400).json({ error: 'You have already booked this workout' });
    }

    const book = await UserWorkouts.create({
      time,
      name,
      date,
      studio,
      trainer,
      workoutId: id,
      location,
      date,
      hard,
      userId,
    });

    console.log('Booked workout:', book);

    return res.status(201).json(book);

  } catch (error) {
    console.error('Error booking workout:', error);

    return res.status(500).json({ error: 'Failed to book workout' });
  }
};

export default bookingWorkout;
