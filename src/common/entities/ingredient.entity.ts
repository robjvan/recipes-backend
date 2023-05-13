import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { Unit } from './unit.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @ManyToOne(() => Recipe, (recipe) => recipe.id)
  recipeId: number;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @Column({ nullable: true })
  // @ManyToOne(() => Unit, (unit) => unit.id)
  units: string;

  @Column({ nullable: true })
  preparation: string;
}
