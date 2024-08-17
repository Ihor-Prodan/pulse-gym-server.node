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
import updateUserRouter from './routes/updateUserRouter.js';
import updateCardRouter from './routes/updateCardRouter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

const corsOptions = {
  origin: 'https://ihor-prodan.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

//routs
app.use('/trainers', trainersRouter);
app.use('/workouts', workoutsRouters);
app.use('/trainings', trainingRoutes);
app.use('remove/:id', trainingRoutes);
app.use('/membership', membershipRouts);
app.use('/card-data', cardRouts);
app.use('/booking', trainingRoutes);
app.use('/auth', userRoutes);

app.use('/user', updateUserRouter);
app.use('/card', updateCardRouter);

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