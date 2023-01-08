import { Purchase } from "src/purchase/entities/purchase.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
