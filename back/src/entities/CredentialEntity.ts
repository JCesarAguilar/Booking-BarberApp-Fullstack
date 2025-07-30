import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './UserEntity';

@Entity({ name: 'credentials' })
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
