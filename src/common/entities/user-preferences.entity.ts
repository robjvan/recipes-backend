import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: false })
  useDarkMode: boolean;

  @Column({ default: '00FF00' })
  mainColor: string;

  @Column({ default: '00CC88' })
  accentColor: string;
}