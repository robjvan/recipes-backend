import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEducationLevel } from "./enums/demographics/user-education-level.enum";
import { UserEmploymentStatus } from "./enums/demographics/user-employment-status.enum";
import { UserGender } from "./enums/demographics/user-gender.enum";
import { UserIncomeRange } from "./enums/demographics/user-income-range.enum";
import { UserMaritalStatus } from "./enums/demographics/user-marital-status.enum";
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