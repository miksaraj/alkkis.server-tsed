import { Controller, Post, BodyParams } from '@tsed/common'
import { BacRequestDto } from 'src/dto/BacRequestDto'
import { BacRepresentation } from 'src/functions/BacFunctions'
import { BacService } from 'src/services/BacService'

@Controller('/bac')
export class BacController {
    constructor(private readonly service: BacService) {}
    
    @Post()
    returnBac(@BodyParams() params: BacRequestDto): BacRepresentation {
        return this.service.getBac(params)
    }
}