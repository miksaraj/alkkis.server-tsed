import { Inject, Injectable } from '@tsed/common'
import { MongooseModel, MongooseService } from '@tsed/mongoose'
import { Product } from '../models/ProductModel'

@Injectable()
export class AlkoService {
    @Inject(Product)
    private model: MongooseModel<Product>

    async findAll(): Promise<Product[]> {
        return await this.model.find().exec()
    }

    async findByQuery(query: string): Promise<Product[]> {
        return await this.model.find({ name : { $regex : query, $options: "i" } }).exec()
    }
}