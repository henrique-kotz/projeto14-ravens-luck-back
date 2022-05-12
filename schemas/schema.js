import joi from 'joi';

export const schemaSignUp = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    image: joi.string().pattern(/([^\s]+(?=\.(jpg|png))\.\2)/).required(),
    password: joi.string().pattern(/[a-zA-Z][0-9]/).min(6).required(),
    confirmPassword: joi.ref('password')
});

export const schemaSignIn = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/[a-zA-Z][0-9]/).min(6).required()
})

