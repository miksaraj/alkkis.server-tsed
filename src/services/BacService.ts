import { Service } from '@tsed/common'
import { BacRequestDto, BacRepresentation } from 'src/alkkis';
import { getBacRepresentation, calculateBac } from 'src/functions/BacFunctions'

@Service()
export class BacService {
    getBac(data: BacRequestDto): BacRepresentation {
        return getBacRepresentation(calculateBac(data))
    }
}