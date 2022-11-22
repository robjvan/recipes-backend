import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCountry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryCode: string;

  @Column()
  name: string;
}