import db from '../db.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.sendStatus(401);

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if (user) {
            res.locals.user = user;
        } else {
            res.sendStatus(401);
            return;
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

    next();
}