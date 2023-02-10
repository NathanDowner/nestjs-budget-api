import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BudgetDto } from 'src/budgets';
import { CreateBudgetDto } from 'src/budgets/dto/create-budget.dto';
import { BudgetsService } from 'src/budgets/budgets.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly budgetsService: BudgetsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Serialize(UserDto)
  @ApiOkResponse({ type: [UserDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Serialize(UserDto)
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return;
  }

  @Get(':id/budgets')
  @ApiTags('budgets')
  @Serialize(BudgetDto)
  @ApiOkResponse({ type: [BudgetDto] })
  getUserBudgets(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.usersService.getUserBudgets(id);
  }

  @Post(':id/budgets')
  @ApiTags('budgets')
  @Serialize(BudgetDto)
  @ApiCreatedResponse({ type: BudgetDto })
  async createUserBudget(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() createBudgetDto: CreateBudgetDto,
  ) {
    return this.budgetsService.create(createBudgetDto, user);
  }
}
