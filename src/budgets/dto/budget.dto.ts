import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, plainToClass } from 'class-transformer';
import { ExpenseDto } from 'src/expense';

export class BudgetDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  income: number;

  @Expose()
  @ApiProperty()
  userId: number;

  @Expose()
  @ApiProperty()
  @Transform(({ obj }) =>
    plainToClass(ExpenseDto, obj.expenses, { excludeExtraneousValues: true }),
  )
  expenses: ExpenseDto[];

  @Expose()
  @ApiProperty()
  date: Date;
}
