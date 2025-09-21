import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import { log } from './utils/logger.js';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/', usersRoutes);

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    log('Server started on', PORT)
});
