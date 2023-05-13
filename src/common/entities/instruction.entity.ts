import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @ManyToOne(() => Recipe, (recipe) => recipe.instructions)
  recipeId: number;

  @Column()
  instruction: string;

  @Column()
  index: number;
}
