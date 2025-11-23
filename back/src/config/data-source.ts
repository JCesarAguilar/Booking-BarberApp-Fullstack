import { DataSource } from 'typeorm';
import { User } from '../entities/UserEntity';
import { Appointment } from '../entities/AppointmentEntity';
import { Credential } from '../entities/CredentialEntity';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SYNC, DB_DROP, DB_LOG } from './envs';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNC,
  dropSchema: DB_DROP,
  logging: DB_LOG,
  entities: [User, Appointment, Credential],
  ssl: {
    rejectUnauthorized: false
  },
  subscribers: [],
  migrations: []
});
