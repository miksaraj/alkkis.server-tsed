import { Ignore, Property, Required } from "@tsed/schema";
import { Model } from '@tsed/mongoose'

@Model()
export class Product{
    @Ignore()
    _id: string

    @Required()
    num: number

    @Required()
    name: string

    @Property()
    maker: string

    @Required()
    bottleSize: string

    @Required()
    price: number

    @Required()
    litrePrice: number

    @Required()
    type: string

    @Property()
    subtype?: string

    @Property()
    beerType?: string

    @Property()
    country: string

    @Property()
    area?: string

    @Property()
    year?: string

    @Property()
    character?: string

    @Required()
    alcoholPercentage: number

    @Property()
    energy: number

    @Property()
    alkoLink: string
}