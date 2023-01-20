import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, plainToClass } from 'class-transformer';
import { ExpenseDto } from 'src/expense';

export class BudgetDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  income: number;

  @ApiProperty()
  @Expose()
  userId: number;

  @ApiProperty()
  @Transform(({ obj }) =>
    plainToClass(ExpenseDto, obj.expenses, { excludeExtraneousValues: true }),
  )
  @Expose()
  expenses: ExpenseDto[];

  @ApiProperty()
  @Expose()
  date: Date;
}
