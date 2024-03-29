import Router from 'express';
import UserController from '../controllers/user-controller.js';
const router = new Router();
const userController = UserController;

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getAllUsers);
router.put('/block', userController.blockUsers);
router.put('/unBlock', userController.unBlockUsers);
router.delete('/delete/:id', userController.deleteUser);

export default router;
