import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ExpenseDto } from './dto/expense.dto';
import { PurchaseDto } from 'src/purchase/dto/purchase.dto';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) { }

  @Post()
  @ApiCreatedResponse({ type: ExpenseDto })
  @Serialize(ExpenseDto)
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  // @Get()
  // findAll() {
  //   return this.expenseService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({ type: ExpenseDto })
  @Serialize(ExpenseDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ExpenseDto })
  @Serialize(ExpenseDto)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Get(':id/purchases')
  @ApiOkResponse({ type: [ExpenseDto] })
  @Serialize(PurchaseDto)
  findPurchases(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findPurchases(id);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    this.expenseService.remove(id);
    return;
  }
}
