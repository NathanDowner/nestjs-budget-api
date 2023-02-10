import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, plainToClass } from 'class-transformer';
import { BudgetDto } from 'src/budgets';

export class UserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  @Transform(({ obj }) =>
    plainToClass(BudgetDto, obj.budgets, { excludeExtraneousValues: true }),
  )
  budgets: BudgetDto[];
}
