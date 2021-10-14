import { Controller, Post, BodyParams } from '@tsed/common'
import { BacRequestDto, BacRepresentation } from 'src/alkkis.types'
import { BacService } from 'src/services/BacService'

@Controller('/bac')
export class BacController {
    constructor(private readonly service: BacService) {}

    @Post()
    returnBac(@BodyParams() params: BacRequestDto): BacRepresentation {
        return this.service.getBac(params)
    }
}