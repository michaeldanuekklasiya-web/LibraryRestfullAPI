import dotenv from 'dotenv';
import express from 'express';
import { publicRouter } from './routes/public-api.js';
import './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/api/v1', publicRouter);

app.listen( port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})