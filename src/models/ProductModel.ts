import { Ignore, Property, Required } from "@tsed/schema";
import { Model } from '@tsed/mongoose'

@Model()
export class Product{
    @Ignore()
    _id: string

    @Required()
    num: string

    @Required()
    name: string

    @Property()
    maker: string

    @Required()
    bottlesize: string

    @Required()
    price: number

    @Required()
    litreprice: number

    @Required()
    type: string

    @Property()
    subtype: string

    @Property()
    country: string

    @Property()
    area: string
    
    @Property()
    year?: string

    @Property()
    character: string

    @Required()
    alkopros: number

    @Property()
    energy: number
}