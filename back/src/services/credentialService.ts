import bcrypt from 'bcrypt';
import { Credential } from '../entities/CredentialEntity';
import { EntityManager } from 'typeorm';
import CredentialRepository from '../repositories/CredentialRepository';

const SALT_ROUNDS: number = 10;

export const createCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const credentials: Credential = entityManager.create(Credential, {
    username: username,
    password: hashedPassword
  });
  const credentialsWithId = await entityManager.save(credentials);
  return credentialsWithId;
};

export const validateCredentialService = async (username: string, password: string): Promise<number> => {
  const credentialsFounded = await CredentialRepository.findOne({
    where: { username: username }
  });
  if (!credentialsFounded) {
    throw new Error('Usuario o contraseña erróneos');
  }
  const isPasswordValid = await bcrypt.compare(password, credentialsFounded.password);
  if (!isPasswordValid) {
    throw new Error('Usuario o contraseña erróneos');
  }
  return credentialsFounded.id;
};
