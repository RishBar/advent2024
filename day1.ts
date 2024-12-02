
// PART 1:

/*
    the raw input takes the shape of:
        68878   98732    
        24519   87903
        73275   70114
    so to format well split the string on newline "\n"
    and then split again on "   "
    and then put the first string in one array 
    and the second string in another
*/

interface LocationIds { 
    leftIds: string[], 
    rightIds: string[] 
}

const formatInput = (rawInput: string): LocationIds => {
    const leftRightLocationIds: LocationIds = {
        leftIds: [],
        rightIds: []
    }

    rawInput.split('\n').forEach((locationIdsString) => {
        const locationIdsArray = locationIdsString.split('   ')
        leftRightLocationIds.leftIds.push(locationIdsArray[0])
        leftRightLocationIds.rightIds.push(locationIdsArray[1])
    })

    return leftRightLocationIds;
}

const sortIds = (ids: LocationIds): LocationIds => {
    ids.leftIds.sort();
    ids.rightIds.sort();
    return ids
}

const getSumOfDifference = (locationIds: LocationIds): number => {
    let sum = 0;
    locationIds.leftIds.forEach((leftLocationId, index) => {
        const difference = Math.abs(Number(leftLocationId) - Number(locationIds.rightIds[index]));
        sum += difference;
    })

    return sum
}

/*
EXAMPLE:

console.log(getSumOfDifference(sortIds(formatInput(
`68878   98732
24519   87903
73275   70114
87985   89419
80485   75440
98994   55979
28041   41805
50762   92905
23796   72412
71699   84915`))))
*/


// PART 2

const getSimilarityScore = (locationIds: LocationIds): number => {
    let similarityScore = 0;
    locationIds.leftIds.forEach((leftLocationId) => {
        const occurences = locationIds.rightIds.filter(rightLocationId => rightLocationId == leftLocationId).length
        similarityScore += occurences * Number(leftLocationId)
    })

    return similarityScore;
}

/*
EXAMPLE:
console.log(getSimilarityScore(formatInput(`68878   98732
24519   87903
73275   70114
87985   89419
80485   75440
98994   55979
28041   41805
50762   92905
23796   72412
71699   84915`)))
*/
