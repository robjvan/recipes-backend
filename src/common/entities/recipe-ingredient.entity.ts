import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BasicIngredient } from './basic-ingredient.entity';
import { Recipe } from './recipe.entity';

//* This "RecipeIngredient" holds the quantity, unit, title, and priority of an ingredient in a recipe.
//* It holds a references to an ingredientID which is the base ingredient (ie. milk, eggs, etc.)

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @ManyToMany(() => Recipe, (recipe) => recipe.id)
  @JoinColumn()
  recipeId: number;
  
  @Column()
  @ManyToMany(() => BasicIngredient, (ingredient) => ingredient.id)
  ingredientId: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  priority: number; //* Used to keep ingredients in order or grouped
}
