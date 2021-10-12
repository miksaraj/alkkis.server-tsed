import { Controller, Post, BodyParams } from '@tsed/common'
import { BacRequestDto } from 'src/dto/BacRequestDto'
import { BacService } from 'src/services/BacService'

@Controller('/bac')
export class BacController {
    constructor(private readonly service: BacService) {}
    @Post()
    returnBac(@BodyParams() params: BacRequestDto): string {
        return this.service.getBac(params)
    }
}