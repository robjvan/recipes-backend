import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  country: string;
  // ie = 'Canada'

  @Column()
  countryCode: string;
  // ie = 'CA'
}