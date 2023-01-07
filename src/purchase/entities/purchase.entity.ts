import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  date: Date;
}
