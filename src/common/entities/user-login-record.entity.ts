import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPlatform } from "./enum/user-platform.enum";
import { User } from "./user.entity";

@Entity()
export class UserLoginRecord {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  // @OneToMany(() => User, (user) => user.id)
  userId: number;
  
  @Column()
  platform: UserPlatform;

  @CreateDateColumn()
  loginDate?: Date;
}