import { Router } from 'express';

import { getCart, addBookToCart, registerOrder } from '../controllers/userController.js';
import { validateToken } from '../middlewares/tokenValidationMiddleware.js';
import { validatePersonalData } from '../middlewares/personalDataValidationMiddleware.js';

const userRouter = Router();
userRouter.use(validateToken);
userRouter.use(validatePersonalData);

userRouter.get('/user/cart', getCart);
userRouter.post('/user/cart', addBookToCart);
userRouter.post('/delivery', registerOrder);

export default userRouter;