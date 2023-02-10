import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BudgetDto } from './dto/budget.dto';
import { ExpenseDto } from 'src/expense';
import { ExpenseService } from 'src/expense/expense.service';
import { CreateExpenseDto } from 'src/expense/dto/create-expense.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@ApiTags('budgets')
@ApiBearerAuth()
@Controller('budgets')
export class BudgetsController {
  constructor(
    private readonly budgetsService: BudgetsService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Get('/:id')
  @ApiOkResponse({ type: BudgetDto })
  @Serialize(BudgetDto)
  async getBudget(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const budget = await this.budgetsService.findById(id);

    if (user.id !== budget.userId) {
      throw new UnauthorizedException();
    }
    return budget;
  }

  @Put('/:id')
  @ApiOkResponse({ type: BudgetDto })
  @Serialize(BudgetDto)
  async updateBudget(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    const budget = await this.budgetsService.findById(id);
    if (user.id !== budget.userId) {
      throw new UnauthorizedException();
    }
    return this.budgetsService.update(budget, updateBudgetDto);
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  async deleteBudget(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const budget = await this.budgetsService.findById(id);
    if (user.id !== budget.userId) {
      throw new UnauthorizedException();
    }
    await this.budgetsService.remove(budget);
    return;
  }

  @Get('/:id/expenses')
  @ApiTags('expenses')
  @ApiOkResponse({ type: [ExpenseDto] })
  async getBudgetExpenses(@Param('id', ParseIntPipe) id: number) {
    const budget = await this.budgetsService.findById(id);
    return budget.expenses;
  }

  @Post('/:id/expenses')
  @ApiTags('expenses')
  @ApiCreatedResponse({ type: ExpenseDto })
  async createBudgetExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    const budget = await this.budgetsService.findById(id);
    return this.expenseService.create(createExpenseDto, budget);
  }
}
