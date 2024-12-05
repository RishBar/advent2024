import { day4Input } from "./day4Input";

// PART 1

const findCharacter = (
    wordSearch: string[][], 
    { row, column }: { row: number; column: number }
): string | undefined => {
    if (wordSearch[row]) {
        return wordSearch[row][column]
    }
}

const searchXmasHorrizontal = (
    wordSearch: string[][], 
    { row, column }: { row: number; column: number }
): number => {
    let xMasOccurences = 0;

    let lettersAfterXRight = ''
    let lettersAfterXLeft = ''
    for (let incrementValue = 1; incrementValue <= 3; incrementValue++) {
        lettersAfterXRight += findCharacter(wordSearch, { row, column: column + incrementValue })
        lettersAfterXLeft += findCharacter(wordSearch, { row, column: column - incrementValue })
    }

    if (lettersAfterXRight === 'MAS') {
        xMasOccurences ++;
    }

    if (lettersAfterXLeft === 'MAS') {
        xMasOccurences ++;
    }

    return xMasOccurences;
}

const searchXmasVertical = (
    wordSearch: string[][], 
    { row, column }: { row: number; column: number }
): number => {
    let xMasOccurences = 0;

    let lettersAfterXDown = ''
    let lettersAfterXUp = ''
    for (let incrementValue = 1; incrementValue <= 3; incrementValue++) {
        lettersAfterXDown += findCharacter(wordSearch, { column, row: row + incrementValue })
        lettersAfterXUp += findCharacter(wordSearch, { column, row: row - incrementValue })
    }

    if (lettersAfterXDown === 'MAS') {
        xMasOccurences ++;
    }

    if (lettersAfterXUp === 'MAS') {
        xMasOccurences ++;
    }

    return xMasOccurences;
}

const searchXmasDiagonal = (
    wordSearch: string[][], 
    { row, column }: { row: number; column: number }
): number => {
    let xMasOccurences = 0;

    let lettersAfterXDownRight = ''
    let lettersAfterXDownLeft = ''
    let lettersAfterXUpRight = ''
    let lettersAfterXUpLeft = ''

    for (let incrementValue = 1; incrementValue <= 3; incrementValue++) {
        lettersAfterXDownRight += findCharacter(wordSearch, { column: column + incrementValue, row: row + incrementValue })
        lettersAfterXDownLeft += findCharacter(wordSearch, { column: column + incrementValue, row: row - incrementValue })
        lettersAfterXUpRight += findCharacter(wordSearch, { column: column - incrementValue, row: row + incrementValue })
        lettersAfterXUpLeft += findCharacter(wordSearch, { column: column - incrementValue, row: row - incrementValue })
    }

    if (lettersAfterXDownRight === 'MAS') {
        xMasOccurences ++;
    }

    if (lettersAfterXDownLeft === 'MAS') {
        xMasOccurences ++;
    }

    if (lettersAfterXUpRight === 'MAS') {
        xMasOccurences ++;
    }

    if (lettersAfterXUpLeft === 'MAS') {
        xMasOccurences ++;
    }

    return xMasOccurences;
}


const findXMAS = (wordSearch: string[][]): number => {
    let XmasCounter = 0;

    wordSearch.forEach((row, rowNumber) => {
        row.forEach((character, columnNumber) => {
            if (character === 'X') {
                XmasCounter += searchXmasHorrizontal(wordSearch, { row: rowNumber, column: columnNumber })
                XmasCounter += searchXmasVertical(wordSearch, { row: rowNumber, column: columnNumber })
                XmasCounter += searchXmasDiagonal(wordSearch, { row: rowNumber, column: columnNumber })
            }
        })
    })

    return XmasCounter;
}

const formattedDay4Input = day4Input.split('\n').map(line => line.split(''))

console.log(findXMAS(formattedDay4Input))


// PART 2

const reverseString = (str: string): string => {
    return str.split('').reverse().join('')
}

const searchDiagonalMas = (
    wordSearch: string[][], 
    { row, column }: { row: number; column: number }
): number => {
    let xMasOccurences = 0;
    const leftDownLetters = findCharacter(wordSearch, { row: row - 1, column: column - 1 }) + 'A' + findCharacter(wordSearch, { row: row + 1, column: column + 1 })
    const leftUpLetters = findCharacter(wordSearch, { row: row + 1, column: column - 1 }) + 'A' + findCharacter(wordSearch, { row: row - 1, column: column + 1 })

    if (leftDownLetters === 'MAS' || reverseString(leftDownLetters) === 'MAS') {
        if (leftUpLetters === 'MAS' || reverseString(leftUpLetters) === 'MAS') {
            xMasOccurences++;
        }
    }

    return xMasOccurences;
}

const findCrossingMAS = (wordSearch: string[][]): number => {
    let crossingMasCounter = 0;

    wordSearch.forEach((row, rowNumber) => {
        row.forEach((character, columnNumber) => {
            if (character === 'A') {
                crossingMasCounter += searchDiagonalMas(wordSearch, { row: rowNumber, column: columnNumber })
            }
        })
    })

    return crossingMasCounter
}

console.log(findCrossingMAS(formattedDay4Input))