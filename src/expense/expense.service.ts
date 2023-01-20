import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { Budget } from 'src/budgets/entities/budget.entity';

@Injectable()
export class ExpenseService {
  constructor(@InjectRepository(Expense) private repo: Repository<Expense>) {}

  create(createExpenseDto: CreateExpenseDto, budget: Budget) {
    const expense = this.repo.create(createExpenseDto);
    expense.budget = budget;
    return this.repo.save(expense);
  }

  async findOne(id: number) {
    const expense = await this.repo.findOneBy({ id });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);
    const updatedExpense = this.repo.merge(expense, updateExpenseDto);
    return this.repo.save(updatedExpense);
  }

  async findPurchases(id: number) {
    const expense = await this.findOne(id);
    return expense.purchases;
  }

  async remove(id: number) {
    const expense = await this.findOne(id);
    return this.repo.remove(expense);
  }
}
