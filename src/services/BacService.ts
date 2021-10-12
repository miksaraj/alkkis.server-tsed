import { Service } from '@tsed/common'
import { BacRequestDto } from '../dto/BacRequestDto';
import { getBacRepresentation, calculateBac } from 'src/functions/BacFunctions'

@Service()
export class BacService {
    getBac(data: BacRequestDto): string {
        return getBacRepresentation(calculateBac(
            data.products,
            data.drinker
        ))
    }
}