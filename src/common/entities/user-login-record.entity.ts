import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPlatform } from './enum/user-platform.enum';
import { User } from './user.entity';

@Entity()
export class UserLoginRecord {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  // @ManyToOne(() => User, (user) => user.id)
  userId: number;

  @Column({ nullable: true })
  platform: UserPlatform;

  @CreateDateColumn()
  loginDate?: Date;
}
