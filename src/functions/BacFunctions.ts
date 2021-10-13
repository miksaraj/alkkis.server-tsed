import { Product } from 'src/models/ProductModel'
import { Drinker, Gender } from 'src/interfaces/DrinkerInterface'

const ALCOHOL_TO_GRAMS_MULTIPLIER = 0.7892

const ALCOHOL_METABOLISM_RATE = 0.017

const GENDER_MULTIPLIER_MALE = 0.68
const GENDER_MULTIPLIER_FEMALE = 0.55

export interface BacRepresentation {
    text: string
}

function sanitizeBottleSize(bottleSize: string): number {
    return parseFloat(
        bottleSize.replace(',', '.').substr(0, bottleSize.indexOf(' '))
        ) * 1000
}

function getGenderMultiplier(gender: Gender): number {
    return gender === Gender.Male ? GENDER_MULTIPLIER_MALE : GENDER_MULTIPLIER_FEMALE
}

/**
 * 
 * @param amountInMillilitres   Beverage container size in ml
 * @param alcoholPercentage     Ethyl alcohol percentage as float
 * @returns Alcohol ethyl content in grams
 */
function getAlcoholContentInGrams(
    amountInMillilitres: number,
    alcoholPercentage: number
    ): number {
        return amountInMillilitres * (alcoholPercentage / 100) * ALCOHOL_TO_GRAMS_MULTIPLIER
    }

function calculateTotalAlcoholContent(products: Product[]): number {
    let alcoholContent = 0.0
    products.forEach(product => {
        alcoholContent += getAlcoholContentInGrams(
            sanitizeBottleSize(product.bottlesize),
            product.alkopros
        )
    })
    return alcoholContent
}

/**
 * 
 * @param products 
 * @param drinker 
 * @returns blood alcohol content as float
 */
export function calculateBac(products: Product[], drinker: Drinker): number {
    return ((
        calculateTotalAlcoholContent(products) / (
            (drinker.weight * 1000) * getGenderMultiplier(drinker.gender)
        )
    ) * 100 ) - (drinker.time * ALCOHOL_METABOLISM_RATE)
}

/**
 * 
 * @param bac blood alcohol content as float
 * @returns blood alcohol content as string represting float to precision of 2
 */
function fixBac(bac: number): string {
    return ((bac > 0) ? (bac * 10).toPrecision(2) : '0') + '‰' 
}

function getIntoxicationLevelDescription(bac: number): string {
    if (bac <= 0.02) return 'Juo ny jottai ees...'
    else if (bac <= 0.03) return 'Hieman hiprakassa'
    else if (bac <= 0.06) return 'Nyt on hyvä känni!'
    else if (bac <= 0.1) return 'Jaahash tua, onkssh vähä juatu?'
    else if (bac <= 0.2) return 'Alkaa olee vähä heikko meno jo...'
    else if (bac <= 0.3) return 'Jos ei muista, ei ole tapahtunut'
    else if (bac <= 0.4) return 'Juot sit ittes kanveesiin...'
    else if (bac <= 0.5) return 'Koomassa on kiva olla...'
    else return 'Onneksi olkoon! Kuolit'
}

export function getBacRepresentation(bac: number): BacRepresentation {
    return {
        text: fixBac(bac) + ' - ' + getIntoxicationLevelDescription(bac)
    }
}
