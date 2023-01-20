import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BudgetsService {
  constructor(@InjectRepository(Budget) private repo: Repository<Budget>) {}

  create(createBudgetDto: CreateBudgetDto, user: User) {
    const budget = this.repo.create(createBudgetDto);
    budget.user = user;
    return this.repo.save(budget);
  }

  async findById(id: number) {
    const budget = await this.repo.findOne({ where: { id } });
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return budget;
  }

  async update(budget: Budget, updateBudgetDto: CreateBudgetDto) {
    const updatedBudget = this.repo.merge(budget, updateBudgetDto);
    return this.repo.save(updatedBudget);
  }

  async remove(budget: Budget) {
    return this.repo.remove(budget);
  }
}
