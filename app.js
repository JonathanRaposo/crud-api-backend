import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import { indexRouter, userRouter } from './routes/index.js';

dotenv.config()
const app = express();

//middleware
app.use(logger('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json())

app.use('/', indexRouter);
app.use('/api', userRouter);

// error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ message: 'Page not found.' })
})

export default app;
