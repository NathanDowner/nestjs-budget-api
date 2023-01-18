import { Expense } from "src/expense/entities/expense.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(
    () => Expense,
    expense => expense.purchases,
    { eager: true, onDelete: 'CASCADE' }
  )
  expense: Expense;
}
