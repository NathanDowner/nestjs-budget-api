import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  allocation: number;
}
