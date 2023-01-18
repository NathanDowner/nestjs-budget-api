import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    const updatedUser = this.repo.merge(user, updateUserDto);
    return this.repo.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    return this.repo.remove(user);
  }

  async getUserBudgets(id: number) {
    const user = await this.findById(id);
    return user.budgets;
  }
}
