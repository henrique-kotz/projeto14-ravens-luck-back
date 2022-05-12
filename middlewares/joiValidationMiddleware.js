import { schemaSignUp, schemaSignIn } from'../schemas/authSchema.js';

export async function validateSignUpData(req, res, next) {
    const { error } = schemaSignUp.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}

export async function validateSignInData(req, res, next) {
    const { error } = schemaSignIn.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    
    next();
}
