import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routers/authRouter.js';
import homeRouter from './routers/homeRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(homeRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log('Listening on port: ' + process.env.PORT);
});