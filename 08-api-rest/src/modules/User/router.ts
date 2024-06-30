import { Router } from 'express';
import userController from './controller/userController';

const router = Router();
const baseUrl = '/user';

router.get(`${baseUrl}/:userId`, userController.read);
router.post(`${baseUrl}`, userController.create);
// router.get('/read-all', userController.readAll);

export const userRouter = router;
