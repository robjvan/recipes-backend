
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserPlatform } from "./enum/user-platform.enum";

@Entity()
export class UserSignupRecord {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @Column({nullable: true})
  platform: UserPlatform;
  
  @CreateDateColumn()
  createdAt?: Date;
}