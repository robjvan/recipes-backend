import { UserType } from "src/common/entities/enum/user-type.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  accountTier: number; /// 0 - Free, 1 - Monthly, 2 - Annual
}