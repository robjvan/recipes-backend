import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCountry } from './country.entity';
import { DemographicInfo } from './demographic-info.entity';
import { UserType } from './enums/user-type.enum';
import { Recipe } from './recipe.entity';
import { UserSubscription } from './user-subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  // @OneToMany(() => Recipe, (recipe) => recipe.userId)
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'https://placekitten.com/200/200' })
  profilePicUrl: string;

  @Column({ default: false })
  emailConfirmed: boolean;

  @Column({ nullable: true })
  // @OneToOne(() => UserSubscription, (userSub) => userSub.id)
  // @JoinColumn()
  subscriptionId: number;

  @Column({ default: UserType.USER })
  accountType: UserType; /// admin, user, tester

  @Column({ nullable: true })
  // @OneToOne(() => DemographicInfo, (demoInfo) => demoInfo.id)
  // @JoinColumn()
  demographicId: number;

  @Column({ nullable: true })
  // @OneToOne(() => UserCountry, (userCountry) => userCountry.id)
  // @JoinColumn()
  countryCodeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  emailToken: string;

  @Column({ nullable: true })
  smsToken: number;

  @Column({default: false})
  has2faEnabled: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  cancelledAt: Date;
}
