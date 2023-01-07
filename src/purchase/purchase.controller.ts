import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('expenses/:expenseId/purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto, @Param('expenseId') expenseId: number) {
    // return this.purchaseService.create(createPurchaseDto);
    console.log(expenseId);

  }

}
