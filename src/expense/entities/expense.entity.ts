import { Purchase } from "src/purchase/entities/purchase.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @OneToMany(() => Purchase, purchase => purchase.expense)
  purchases: Purchase[];

  @ManyToOne(() => User, user => user.expenses)
  user: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
