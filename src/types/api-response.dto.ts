import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ApiResponse {

  constructor(message: string, code: ApiCode) {
    this.message = message;
    this.code = code;
  }

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty()
  code: ApiCode;
}

export enum ApiCode {
  SUCCESS = 0,
  ERROR = 1
}