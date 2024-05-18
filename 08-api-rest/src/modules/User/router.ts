import { Router } from 'express';
import userController from './controller/userController';

const router = Router();
const baseUrl = '/';

router.get(`/read`, userController.read);
router.post('/create', userController.create);
router.get('/read-all', userController.readAll);

export const userRouter = router;
