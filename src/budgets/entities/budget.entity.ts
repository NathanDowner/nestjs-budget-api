import { Expense } from 'src/expense/entities/expense.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('budgets')
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  income: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  date: Date;

  @OneToMany(() => Expense, (expense) => expense.budget, { eager: true })
  expenses: Expense[];

  @ManyToOne(() => User, (user) => user.budgets)
  user: User;
}
