import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//* This "Ingredient" class is a base ingredient without units or amounts
//*
//* This table is used to minimize repetition in the database of strings like
//* "eggs", "chicken", "flour", and others

@Entity()
export class BasicIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}