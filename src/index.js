import dotenv from 'dotenv';
import express from 'express';
import './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen( port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})