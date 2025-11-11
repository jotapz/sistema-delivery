import express from 'express';
import cors from 'cors';
import deliveryRoutes from './routes/deliveryRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());



