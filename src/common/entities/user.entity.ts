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
import { UserType } from './enum/user-type.enum';
import { UserSubscription } from './user-subscription.entity';
import { DemographicInfo } from './demographic.entity';
import { Recipe } from './recipe.entity';
import { UserLoginRecord } from './user-login-record.entity';
import { UserSignupRecord } from './user-signup-record.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  // @OneToMany(() => Recipe, (recipe) => recipe.userId)
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  // @Column({ default: 'https://placekitten.com/200/200' })
  // profilePicUrl?: string;

  @Column({ default: false })
  emailConfirmed: boolean;

  @Column({ nullable: true })
  subscriptionId: number;

  @Column({ default: UserType.USER })
  accountType: UserType; /// admin, user, tester

  @Column({ nullable: true })
  demographicId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  emailToken: string;

  @Column({ nullable: true })
  smsToken: number;

  @Column({ default: false })
  has2faEnabled: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  cancelledAt: Date;

  /// Not columns, only used for relations
  // @OneToMany(() => Recipe, (recipe) => recipe.id)
  // recipes: Recipe[];

  // @OneToMany(() => Recipe, (recipe) => recipe.id)
  // loginRecords: UserLoginRecord[];

  // @OneToOne(() => UserSignupRecord, (record) => record.id)
  // signUpRecords: UserSignupRecord;
}
