/*------------------------------------------------------------------*/
// Api Routes
/*------------------------------------------------------------------*/

import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authorized, authAdmin } from '../middlewares/auth'

const router = Router();

router.route('/')
    .get(authorized, userController.returnUser);

/*------------------------------------------------------------------*/
// User Routes
/*------------------------------------------------------------------*/

router.route('/register')
    .post(authAdmin, userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

/*------------------------------------------------------------------*/

export default router;