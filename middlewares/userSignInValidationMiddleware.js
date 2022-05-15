import db from '../db.js';
import bcrypt from 'bcrypt';

export async function validateSignInUser(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({email})
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Usuário não existe!');
        } 

        res.locals.user = user;
    }catch(e) {
        res.sendStatus(500);
    }

    next();
}
