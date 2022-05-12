import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import homeRouter from './routers/homeRouter.js';

const app = express();
app.use(cors());
app.use(json());

app.use(homeRouter);


app.listen(process.env.PORT, () => {
    console.log('Listening on port: ' + process.env.PORT);
});