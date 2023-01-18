import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BudgetDto } from 'src/budgets';
import { CreateBudgetDto } from 'src/budgets/dto/create-budget.dto';
import { BudgetsService } from 'src/budgets/budgets.service';

@ApiTags('users')
@Controller('users')
// @Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly budgetsService: BudgetsService
  ) { }

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('test')
  test(@Request() req: any) {
    return req.user;
  }

  @Get()
  @ApiOkResponse({ type: [UserDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return;
  }

  @Get(':id/budgets')
  @Serialize(BudgetDto)
  @ApiOkResponse({ type: [BudgetDto] })
  getUserBudgets(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserBudgets(id);
  }

  @Post(':id/budgets')
  @Serialize(BudgetDto)
  @ApiCreatedResponse({ type: BudgetDto })
  async createUserBudget(@Param('id', ParseIntPipe) id: number, @Body() createBudgetDto: CreateBudgetDto) {
    const user = await this.usersService.findById(id);
    return this.budgetsService.create(createBudgetDto, user);
  }
}
