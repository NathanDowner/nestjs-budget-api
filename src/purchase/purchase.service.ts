import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(@InjectRepository(Purchase) private repo: Repository<Purchase>) {}
  
  create(createPurchaseDto: CreatePurchaseDto) {
    const purchase = this.repo.create(createPurchaseDto);
    return this.repo.save(purchase);
  }

  findByExpenseId(id: number) {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
