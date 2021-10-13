import { Service } from '@tsed/common'
import { BacRequestDto } from '../dto/BacRequestDto';
import { getBacRepresentation, calculateBac, BacRepresentation } from 'src/functions/BacFunctions'

@Service()
export class BacService {
    getBac(data: BacRequestDto): BacRepresentation {
        return getBacRepresentation(calculateBac(
            data.products,
            data.drinker
        ))
    }
}