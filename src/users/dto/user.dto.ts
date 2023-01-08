import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

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
}