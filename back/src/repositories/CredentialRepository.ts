import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Credential } from '../entities/CredentialEntity';

const CredentialRepository: Repository<Credential> = AppDataSource.getRepository(Credential);

export default CredentialRepository;
