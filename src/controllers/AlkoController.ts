import { Controller, Get } from '@tsed/common'
import { Product } from 'src/models/ProductModel'
import { AlkoService } from 'src/services/AlkoService'

@Controller('/alko')
export class AlkoController {
    constructor(private readonly service: AlkoService) {}

    @Get('/all')
    async findAll(): Promise<Product[]> {
        return await this.service.findAll()
    }
}