import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPlatform } from './enum/user-platform.enum';
import { User } from './user.entity';

@Entity()
export class UserSignupRecord {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  // @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  userId: number;

  @Column({ nullable: true })
  platform: UserPlatform;

  @CreateDateColumn()
  createdAt?: Date;
}
