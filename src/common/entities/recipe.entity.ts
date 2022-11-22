import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  servings: number;

  @Column({ nullable: true })
  prepTime: number;

  @Column({ nullable: true })
  cookTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;

  @Column({ default: false })
  containsEggs: boolean;
  
  @Column({ default: false })
  containsWheat: boolean;
  
  @Column({ default: false })
  containsSoy: boolean;
  
  @Column({ default: false })
  containsSeafood: boolean;
  
  @Column({ default: false })
  containsPeanuts: boolean;
  
  @Column({ default: false })
  containsTreeNuts: boolean;
  
  @Column({ default: false })
  containsDairy: boolean;
}