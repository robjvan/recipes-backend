import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  // @OneToMany(() => Ingredient, (ingredient) => ingredient.unitsId)
  id: number;

  @Column()
  unit: string;
}
