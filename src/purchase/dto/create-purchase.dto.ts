import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePurchaseDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  cost: number;
}
