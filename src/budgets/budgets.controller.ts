import { Body, Controller, Get, Param, ParseIntPipe, Put, UnauthorizedException } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@ApiTags('budgets')
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) { }

  @Get('/:id')
  async getBudget(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    const budget = await this.budgetsService.findById(id);
    console.log(budget);
    // TODO: Investigate why the user doesn't come back here but does when you create a budget

    if (user.id !== budget.user.id) {
      throw new UnauthorizedException();
    }
    return budget;
  }

  @Put('/:id')
  async updateBudget(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User, @Body() updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.budgetsService.findById(id);
    if (user.id !== budget.user.id) {
      throw new UnauthorizedException();
    }
    return this.budgetsService.update(budget, updateBudgetDto);
  }

}
