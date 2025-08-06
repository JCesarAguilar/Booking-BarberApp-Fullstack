import { Request, Response } from 'express';
import { PublicUserResponse, UserLoginDoneDTO, UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';
import { getUsersService, registerUserService, getUserByIdService, loginUserService, uploadProfilePicService } from '../services/userService';
import { User } from '../entities/UserEntity';

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userFounded = await getUserByIdService(Number(id));
    res.status(200).json(userFounded);
  } catch (error) {
    res.status(404).json({
      message: error instanceof Error ? error.message : 'Usuario no encontrado'
    });
  }
};

export const registerUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
  try {
    const newUser: PublicUserResponse = await registerUserService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const loginUserController = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
  try {
    const user: UserLoginDoneDTO = await loginUserService(req.body);
    res.status(200).json({
      login: true,
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'No se pudo iniciar sesión'
    });
  }
};

export const uploadProfilePicController = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }

    const userId: number = Number(req.body.userId);
    const imageUrl: string = req.file.path;
    const updatedImage = await uploadProfilePicService(userId, imageUrl);
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'No se pudo cargar la imagen'
    });
  }
};
