import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiResponse<T> {
  constructor(message: string, code: ApiCode, data: T) {
    this.message = message;
    this.code = code;
    this.data = data;
  }

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty()
  code: ApiCode;

  @Expose()
  @ApiProperty()
  data: T;
}

export enum ApiCode {
  SUCCESS = 0,
  ERROR = 1,
}
