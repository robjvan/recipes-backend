import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEducationLevel } from "./enum/demographics/user-education-level.enum";
import { UserEmploymentStatus } from "./enum/demographics/user-employment-status.enum";
import { UserGender } from "./enum/demographics/user-gender.enum";
import { UserIncomeRange } from "./enum/demographics/user-income-range.enum";
import { UserMaritalStatus } from "./enum/demographics/user-marital-status.enum";
import { User } from "./user.entity";

@Entity()
export class DemographicInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  age: number;

  @Column()
  maritalStatus: UserMaritalStatus;

  @Column()
  employmentStatus: UserEmploymentStatus;

  @Column()
  incomeRange: UserIncomeRange;

  @Column()
  gender: UserGender;

  @Column()
  educationLevel: UserEducationLevel;

  @Column()
  numberOfChildren: number;

  @Column()
  notes: string;
}