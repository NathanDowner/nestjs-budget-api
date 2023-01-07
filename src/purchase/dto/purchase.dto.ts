import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PurchaseDto {
  @Expose()
  @ApiProperty()
  id: number

  @Expose()
  @ApiProperty()
  name: string

  @Expose()
  @ApiProperty()
  cost: number

  @Expose()
  @ApiProperty()
  date: Date;
}