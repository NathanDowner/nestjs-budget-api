import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ExpenseDto } from './dto/expense.dto';
import { PurchaseDto } from 'src/purchase/dto/purchase.dto';
import { CreatePurchaseDto } from 'src/purchase/dto/create-purchase.dto';
import { PurchaseService } from 'src/purchase/purchase.service';

@ApiTags('expenses')
@ApiBearerAuth()
@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly purchaseService: PurchaseService,
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: ExpenseDto })
  @Serialize(ExpenseDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: ExpenseDto })
  @Serialize(ExpenseDto)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    this.expenseService.remove(id);
    return;
  }

  @Get(':id/purchases')
  @ApiTags('purchases')
  @ApiOkResponse({ type: [PurchaseDto] })
  @Serialize(PurchaseDto)
  findPurchases(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.findPurchases(id);
  }

  @Post(':id/purchases')
  @ApiTags('purchases')
  @ApiCreatedResponse({ type: PurchaseDto })
  @Serialize(PurchaseDto)
  async createPurchase(
    @Param('id', ParseIntPipe) expenseId: number,
    @Body() createPurchaseDto: CreatePurchaseDto,
  ) {
    const expense = await this.expenseService.findOne(expenseId);
    return this.purchaseService.create(createPurchaseDto, expense);
  }
}
