import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseModule } from './purchase/purchase.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Expense } from './expense/entities/expense.entity';
import { Purchase } from './purchase/entities/purchase.entity';
import { BudgetsModule } from './budgets/budgets.module';
import { Budget } from './budgets/entities/budget.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Budget, Expense, Purchase],
      synchronize: true,
    }),
    PurchaseModule,
    ExpenseModule,
    AuthModule,
    BudgetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
