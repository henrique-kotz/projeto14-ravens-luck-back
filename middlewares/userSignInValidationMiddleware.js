import db from '../db.js';
import bcrypt from 'bcrypt';

export async function validateSignInUser(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({email})
        if (!user) {
            return res.status(401).send('Usuário não encontrado!');
        } 
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Senha inválida!');
        }

    }catch(e) {
        res.sendStatus(500);
    }

    next();
}