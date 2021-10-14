import {
    AlcoholMetabolismRate,
    AlcoholToGramsMultiplier,
    BacRepresentation,
    BacRequestDto,
    BacValue,
    Gender,
    GenderMultiplier,
    Product
} from 'src/alkkis.types'

function sanitizeBottleSize(bottleSize: string): number {
    return parseFloat(
        bottleSize.replace(',', '.').substr(0, bottleSize.indexOf(' '))
        ) * 1000
}

function getGenderMultiplier(gender: Gender): GenderMultiplier {
    return gender === Gender.Male ? GenderMultiplier.Male : GenderMultiplier.Female
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
        return amountInMillilitres * (alcoholPercentage / 100) * AlcoholToGramsMultiplier
    }

function calculateTotalAlcoholContent(products: Product[]): number {
    let alcoholContent = 0.0
    products.forEach(product => {
        alcoholContent += getAlcoholContentInGrams(
            sanitizeBottleSize(product.bottleSize),
            product.alcoholPercentage
        )
    })
    return alcoholContent
}
/**
 *
 * @param request object containing products array and drinker object
 * @returns blood alcohol content as float
 */
export function calculateBac(request: BacRequestDto): BacValue {
    return ((
        calculateTotalAlcoholContent(request.products) / (
            (request.drinker.weight * 1000) * getGenderMultiplier(request.drinker.gender)
        )
    ) * 100 ) - (request.drinker.time * AlcoholMetabolismRate)
}

/**
 *
 * @param bac blood alcohol content as float
 * @returns blood alcohol content as string representing float to precision of 2
 */
function fixBac(bac: BacValue): string {
    return ((bac > 0) ? (bac * 10).toPrecision(2) : '0') + '‰'
}

function getIntoxicationLevelDescription(bac: BacValue): string {
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

export function getBacRepresentation(bac: BacValue): BacRepresentation {
    return {
        text: fixBac(bac) + ' - ' + getIntoxicationLevelDescription(bac)
    }
}
