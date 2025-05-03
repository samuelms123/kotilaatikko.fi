import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import klarnaRouter from './api/routes/klarnaRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Configure CORS properly
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use('/api/v1', api);

app.use('/api/v1/klarna', klarnaRouter);

// serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

export default app;
