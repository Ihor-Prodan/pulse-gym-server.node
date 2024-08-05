import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


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

