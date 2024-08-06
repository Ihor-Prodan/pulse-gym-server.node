import Workout from '../models/Workout';

export const getAllWorkout = async (req, res) => {
  try {
    const workouts = await Workout.findAll();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workouts = await Workout.findByPk(req.params.id);

    if (workouts) {
      res.status(200).json(workouts);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
