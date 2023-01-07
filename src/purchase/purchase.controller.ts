import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PurchaseDto } from './dto/purchase.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@ApiTags('purchases')
@Controller('expenses/:expenseId/purchases')
@Serialize(PurchaseDto)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  @ApiCreatedResponse({ type: PurchaseDto })
  create(@Body() createPurchaseDto: CreatePurchaseDto, @Param('expenseId') expenseId: number) {
    return this.purchaseService.create(createPurchaseDto);
  }

  // @Get()
  // @ApiOkResponse({ type: [PurchaseDto] })
  // findAll(@Param('expenseId') expenseId: number) {
  //   return this.purchaseService.findByExpenseId(expenseId);
  // }

  @Get('/:id')
  @ApiOkResponse({ type: PurchaseDto })
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseService.findOne(id);
  }

  @Put('/:id')
  @ApiOkResponse({ type: PurchaseDto })
  @ApiNotFoundResponse()
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseService.remove(id);
  }
}
