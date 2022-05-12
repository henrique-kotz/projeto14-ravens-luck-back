import db from "../db.js";

export async function validateSignUpUser(req, res, next) {
    try {
        const user = await db.collection("users").findOne({ email: req.body.email });
  
        if (user) {
          return res.status(422).send("Usuário já cadastrado!");
        }
    
    }catch(e) {
        res.sendStatus(500);
    }

    next();
}