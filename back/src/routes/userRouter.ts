import { Request, Response, Router } from 'express';
import { getUsersController, getUserByIdController, registerUserController, loginUserController, uploadProfilePicController } from '../controllers/userController';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';
import { validateIdParam } from '../middlewares/validateIdParam';
import upload from '../middlewares/multer';

const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response): Promise<void> => getUsersController(req, res));
userRouter.get('/:id', validateIdParam, (req: Request, res: Response) => getUserByIdController(req, res));
userRouter.post('/register', (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => registerUserController(req, res));
userRouter.post('/login', (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => loginUserController(req, res));
userRouter.post('/upload', upload.single('image'), uploadProfilePicController);

export default userRouter;
