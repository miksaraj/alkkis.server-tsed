import { Controller, Get, QueryParams } from '@tsed/common'
import { Product } from 'src/models/ProductModel'
import { AlkoService } from 'src/services/AlkoService'

@Controller('/alko')
export class AlkoController {
    constructor(private readonly service: AlkoService) {}
    
    @Get('/search')
    async findByQuery(@QueryParams('name') name: string): Promise<Product[]> {
        return await this.service.findByQuery(name)
    }
}