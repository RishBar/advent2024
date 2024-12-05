import { day3Input } from "./day3Input";

const findSumOfMultiplications = (raw: string): number => {
    const regexp = /mul\((-?\d{1,3}),(-?\d{1,3})\)/g
    const matches = [...raw.matchAll(regexp)]

    let sum = 0;
    matches.forEach(match => {
        const numbersToMultiply = match[0].slice(4).replace(')', '').split(',')

        sum += Number(numbersToMultiply[0]) * Number(numbersToMultiply[1]) 
    })

    return sum;
}

console.log(findSumOfMultiplications(day3Input))

const findSumOfEnabledMultiplications = (raw: string): number => {
    const regexp = /(mul\((-?\d{1,3}),(-?\d{1,3})\)|do\(\)|don't\(\))/g
    const matches = [...raw.matchAll(regexp)]

    let enabled = true;
    let sum = 0;

    matches.forEach(match => {
        const matchedString = match[0];
        if (matchedString === 'do()') {
            enabled = true;
            return;
        }

        if (matchedString === "don't()") {
            enabled = false;
            return;
        }

        if (enabled) {
            const numbersToMultiply = match[0].slice(4).replace(')', '').split(',')
            sum += Number(numbersToMultiply[0]) * Number(numbersToMultiply[1]) 
        }
    })

    return sum;
}

console.log(findSumOfEnabledMultiplications(day3Input))