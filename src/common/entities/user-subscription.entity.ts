import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserSubscription {
  @PrimaryGeneratedColumn()
  // @OneToOne(() => User, (user) => user.subscriptionId)
  id: number;

  @Column({ default: 0 })
  userTierId: number;
  // 0 = Free
  // 1 = Trial
  // 2 = Monthly
  // 3 = Perm/Donated
  // 4 = Tester
}
