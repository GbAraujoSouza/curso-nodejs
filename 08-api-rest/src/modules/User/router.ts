import { Router } from 'express';
import userController from './controller/userController';

const router = Router();
const baseUrl = '/';

router.get(`/:userId`, userController.read);
router.post('/', userController.create);
// router.get('/read-all', userController.readAll);

export const userRouter = router;
