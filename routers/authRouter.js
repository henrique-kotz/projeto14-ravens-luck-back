import { Router } from 'express';
import { postSignIn, postSignUp } from '../controllers/authController.js';
import { validateSignInData, validateSignUpData } from '../middlewares/joiValidationMiddleware.js';
import { validateSignInUser } from '../middlewares/userSignInValidationMiddleware.js';
import { validateSignUpUser } from '../middlewares/userSignUpValidationMiddleware.js';

const authRouter = Router();

authRouter.post("/sign-up", validateSignUpData, validateSignUpUser, postSignUp);

authRouter.post("/sign-in", validateSignInData, validateSignInUser, postSignIn);

export default authRouter;