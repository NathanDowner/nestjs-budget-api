import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(@InjectRepository(Purchase) private repo: Repository<Purchase>) { }

  create(createPurchaseDto: CreatePurchaseDto) {
    const purchase = this.repo.create(createPurchaseDto);
    return this.repo.save(purchase);
  }

  async findOne(id: number) {
    const purchase = await this.repo.findOneBy({ id });
    if (!purchase) {
      throw new Error('Purchase not found');
    }
    return purchase;
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const purchase = await this.findOne(id);
    const updatedPurchase = this.repo.merge(purchase, updatePurchaseDto);
    return this.repo.save(updatedPurchase);
  }

  async remove(id: number) {
    const purchase = await this.findOne(id);
    return this.repo.remove(purchase);
  }
}
