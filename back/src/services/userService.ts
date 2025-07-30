import { PublicUserResponse, UserLoginDoneDTO, UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/UserEntity';
import { createCredentialService, validateCredentialService } from './credentialService';
import UserRepository from '../repositories/UserRepository';
import CredentialRepository from '../repositories/CredentialRepository';

export const getUsersService = async (): Promise<User[]> => {
  const usersTotal = await UserRepository.find();
  return usersTotal;
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const userFounded = await UserRepository.findById(id);
  return userFounded;
};

export const registerUserService = async (userData: UserRegisterDTO): Promise<PublicUserResponse> => {
  const usernameExists = await CredentialRepository.findOneBy({ username: userData.username });
  if (usernameExists) {
    throw new Error('El nombre de usuario ya está en uso');
  }
  const emailExists = await UserRepository.findOneBy({ email: userData.email });
  if (emailExists) {
    throw new Error('El email ya está registrado');
  }
  const dniExists = await UserRepository.findOneBy({ nDni: userData.nDni });
  if (dniExists) {
    throw new Error('El DNI ya está registrado');
  }
  const savedUser = await AppDataSource.transaction(async transactionalEntityManager => {
    const userCredential = await createCredentialService(transactionalEntityManager, userData.username, userData.password);
    const newUser: User = transactionalEntityManager.create(User, {
      name: userData.name,
      birthdate: userData.birthdate,
      email: userData.email,
      nDni: userData.nDni,
      credentials: userCredential
    });
    await transactionalEntityManager.save(newUser);
    return newUser;
  });
  return {
    name: savedUser.name,
    email: savedUser.email
  };
};

export const loginUserService = async (user: UserLoginDTO): Promise<UserLoginDoneDTO> => {
  const credentialId: number = await validateCredentialService(user.username, user.password);
  const userFounded: User | null = await UserRepository.findOne({
    where: {
      credentials: {
        id: credentialId
      }
    }
  });
  return {
    id: userFounded?.id ?? 0,
    name: userFounded?.name ?? '',
    email: userFounded?.email ?? '',
    birthdate: userFounded?.birthdate ?? new Date(),
    nDni: userFounded?.nDni ?? 0
  };
};

export const uploadProfilePicService = async (userId: number, imageUrl: string): Promise<string> => {
  if (!imageUrl) throw new Error('No se subió ninguna imagen');

  const user = await UserRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error('Usuario no encontrado');

  user.profile_image = imageUrl;
  await UserRepository.save(user);

  return imageUrl;
};
