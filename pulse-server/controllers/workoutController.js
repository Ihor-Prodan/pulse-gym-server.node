import Workouts from '../models/Workout.js';

export const getAllWorkout = async (req, res) => {
  try {
    const workouts = await Workouts.findAll();

    res.status(200).json(workouts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workouts = await Workouts.findByPk(req.params.id);

    if (workouts) {
      res.status(200).json(workouts);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
