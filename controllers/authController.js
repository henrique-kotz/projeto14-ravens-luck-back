import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import db from '../db.js';

dotenv.config();

export async function postSignUp(req, res) {
    const { username, email, password, image  } = req.body;
    try {
        const SALT = 10;
        await db.collection("users").insertOne({
            username,
            email,
            image,
            password: bcrypt.hashSync(password, SALT)
        })
        res.sendStatus(201);
    }catch(e) {
        res.status(500).send("Não foi possível cadastrar usuário!");
    }
}

export async function postSignIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({email});
        const session = await db.collection("sessions").findOne({userId: user._id});  
        if (session) {
            res.status(201).send({name: user.username, image: user.image, token: session.token});
        } else {
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign({ userId: user._id }, secretKey);
            await db.collection("sessions").insertOne({userId: user._id, token});
            res.status(201).send({name: user.username, image: user.image, token});
        }  
    }catch(e) {
        res.status(500).send("Não foi possível fazer o login!");
    }
}