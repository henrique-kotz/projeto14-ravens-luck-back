import { Router } from 'express';

import { getBooks } from '../controllers/homeController.js';

const homeRouter = Router();

homeRouter.get('/', getBooks);

export default homeRouter;