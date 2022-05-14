import { Router } from 'express';

import { getBooks, getOneBook } from '../controllers/homeController.js';

const homeRouter = Router();

homeRouter.get('/', getBooks);
homeRouter.get('/books/:bookId', getOneBook);

export default homeRouter;