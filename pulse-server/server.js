/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database.js';
import trainersRouter from './routes/trainersRouter.js';
import workoutsRouters from './routes/workoutsRouters.js';
import trainingRoutes from './routes/trainingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import membershipRouts from './routes/membershipRouts.js';
import cardRouts from './routes/cardRouts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//routs
app.use('/trainers', trainersRouter);
app.use('/workouts', workoutsRouters);
app.use('/trainings', trainingRoutes);
app.use('/auth', userRoutes);
app.use('/membership', membershipRouts);
app.use('/card-data', cardRouts);
app.get('/find-user', userRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.get('/', (req, res) => {
  res.send('Server is running...');
});