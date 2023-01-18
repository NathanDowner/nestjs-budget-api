import { Budget } from "src/budgets/entities/budget.entity";
import { Expense } from "src/expense/entities/expense.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Budget, budget => budget.user, { eager: true })
  budgets: Budget[];
}
