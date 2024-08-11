import Trainers from '../models/Trainers.js';

export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainers.findAll();

    res.status(200).json(trainers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainerById = async (req, res) => {
  try {
    const trainers = await Trainers.findByPk(req.params.id);

    if (trainers) {
      res.status(200).json(trainers);

    } else {
      res.status(404).json({ message: 'Trainer not found' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
