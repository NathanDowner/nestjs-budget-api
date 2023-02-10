import { Budget } from 'src/budgets/entities/budget.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  allocation: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  budgetId: number;

  @OneToMany(() => Purchase, (purchase) => purchase.expense, { eager: true })
  purchases: Purchase[];

  @ManyToOne(() => Budget, (budget) => budget.expenses)
  budget: Budget;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
