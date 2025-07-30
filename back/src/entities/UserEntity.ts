import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { Appointment } from './AppointmentEntity';
import { Credential } from './CredentialEntity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

  @Column({ type: 'int', unique: true, nullable: false })
  nDni: number;

  @Column({ nullable: true })
  profile_image?: string;

  @OneToOne(() => Credential, { cascade: true })
  @JoinColumn()
  credentials: Credential;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
