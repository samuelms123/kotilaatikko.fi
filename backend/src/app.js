import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use('/api/v1', api);

// serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

export default app;
