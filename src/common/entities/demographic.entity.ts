import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class DemographicInfo {
  @PrimaryGeneratedColumn()
  // @OneToOne(() => User, (user) => user.demographicId)
  id: number;

  @Column({ default: 0 })
  ageRange: number;
  // 0 = No answer
  // 1 = <18
  // 2 = 18-25
  // 3 = 26-35
  // 4 = 36-45
  // 5 = 46-55
  // 6 = 56-65
  // 7 = >66

  @Column({ default: 0 })
  maritalStatus: number;
  // 0 = No answer
  // 1 = Single
  // 2 = Married
  // 3 = Common Law
  // 4 = Domestic Partnership
  // 5 = Divorced
  // 6 = Widowed

  @Column({ default: 0 })
  employmentStatus: number;
  // 0 = No answer
  // 1 = Part-time
  // 2 = Full-time
  // 3 = Self-employed
  // 4 = Student
  // 5 = Unemployed

  @Column({ default: 0 })
  genderIdentity: number;
  // 0 = No answer
  // 1 = Male
  // 2 = Female
  // 3 = Other

  @Column({ default: 0 })
  incomeRange: number;
  // 0 = No answer
  // 1 = <$30,000
  // 2 = $30,001-$45,000
  // 3 = $45,001-$60,000
  // 4 = $60,001-$75,000
  // 5 = $75,001-$90,000
  // 6 = >$90,000

  @Column({ nullable: true })
  countryId: number;
}
