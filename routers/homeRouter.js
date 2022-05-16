import { Router } from 'express';

import { getBooks, getOneBook } from '../controllers/homeController.js';
import { selectBookmarkIcon } from '../middlewares/bookmarkIconValidation.js';
import { validatePersonalData } from '../middlewares/personalDataValidationMiddleware.js';
import { validateToken } from '../middlewares/tokenValidationMiddleware.js';

const homeRouter = Router();

homeRouter.get('/', getBooks);
homeRouter.get('/books/:bookId', getOneBook);
homeRouter.post('/', validateToken, validatePersonalData, selectBookmarkIcon);
homeRouter.post('/books/:bookId', validateToken, validatePersonalData, selectBookmarkIcon);

export default homeRouter;