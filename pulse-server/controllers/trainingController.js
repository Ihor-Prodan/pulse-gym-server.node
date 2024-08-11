import Trainings from '../models/Trainings.js';

export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Trainings.findAll();

    res.status(200).json(trainings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainingById = async (req, res) => {
  try {
    const training = await Trainings.findByPk(req.params.id);

    if (training) {
      res.status(200).json(training);
    } else {
      res.status(404).json({ message: 'Training not found' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
