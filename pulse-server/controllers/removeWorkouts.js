import UserWorkouts from '../models/UserWorkouts.js';

export const removeWorkoutById = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { userId } = req.body;

    const deletedWorkout = await UserWorkouts.destroy({
      where: { workoutId: workoutId, userId: userId },
    });

    if (deletedWorkout === 0) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    return res.status(200).json({ message: 'Workout removed successfully' });

  } catch (error) {
    console.error('Error removing workout:', error);
    return res.status(500).json({ message: error.message });
  }
};

export default removeWorkoutById;
