import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ExpenseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  budgetId: number;

  @Expose()
  @ApiProperty()
  allocation: number;

  @Expose()
  @ApiProperty()
  date: Date;
}
