import { IsNumber } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Recipe } from "./recipe.entity";

//* This "InstructionStep" class holds the description, recipeId, and priority of a step in a recipe.

@Entity()
export class InstructionStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToMany(() => Recipe, recipe => recipe.id)
  @JoinColumn()
  recipeId: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  priority: number; //* Used to keep steps in order
}