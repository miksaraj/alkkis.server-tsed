import { Product } from '../models/ProductModel'
import { Drinker } from "../interfaces/DrinkerInterface"

export class BacRequestDto {
    drinker: Drinker
    products: Product[]
}