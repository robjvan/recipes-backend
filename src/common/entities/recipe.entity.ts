import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @ManyToOne(() => User, (user) => user.id)
  userId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  cookTime: number;

  @Column({ nullable: true })
  prepTime: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  servings: number;

  // @OneToMany(() => Ingredient, (ingredient) => ingredient.recipeId)
  // ingredients: Ingredient[];

  // @OneToMany(() => Instruction, (instruction) => instruction.recipeId)
  // instructions: Instruction[];
}
