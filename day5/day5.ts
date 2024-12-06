import { rawDay5Input } from "./day5Input";

const formatRawData = (rawData: string) => {
    const rulesAndUpdates = rawData.split('\n\n');
    const formattedDay5Input = { 
        rules: rulesAndUpdates[0].split('\n'),
        updates: rulesAndUpdates[1].split('\n').map(update => update.split(',')),
    };

    return formattedDay5Input;
};

const getRulePerPage = (rules: string[]): Record<string, string[]> => {
    const rulesPerPage = {};
    rules.forEach((rules) => {
        const preceedingPage = rules.split('|')[0];
        const followingPage = rules.split('|')[1];
        if (!rulesPerPage[preceedingPage]) {
            rulesPerPage[preceedingPage] = [followingPage];
        } else {
            rulesPerPage[preceedingPage].push(followingPage);
        }
    })

    return rulesPerPage;
};

const determineValidUpdates = (
    { rules, updates }: {rules: string[]; updates: string[][]}
): string[][] => {
    const rulesPerPage = getRulePerPage(rules);
    const validUpdates: string[][] = [];

    updates.forEach((update) => {
        const preceedingPages: string[] = [];
        let isValidOrdering = true;

        for (const pageNumber of update) {
            const pagesThatMustFollow = rulesPerPage[pageNumber];
            if (pagesThatMustFollow) {
                isValidOrdering = preceedingPages.every(preceedingPage => !pagesThatMustFollow.includes(preceedingPage));
            }

            if (!isValidOrdering) {
                break;
            }

            preceedingPages.push(pageNumber);
        }

        if (isValidOrdering) {
            validUpdates.push(update);
        };
    });

    return validUpdates;
};

const findSumOfMiddleUpdates = (updates: string[][]): number => {
    let sum = 0;
    updates.forEach(update => sum += Number(update[Math.floor(update.length / 2)]));

    return sum;
};

const mainPartOne = (rawData: string) => {
    const formattedDay5Input = formatRawData(rawData);
    const valiedUpdates = determineValidUpdates(formattedDay5Input);
    const sum = findSumOfMiddleUpdates(valiedUpdates);

    console.log(sum);
};

const exampleData = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

mainPartOne(exampleData);
mainPartOne(rawDay5Input);

// PART 2

const fixInvalidUpdates = (
    { rules, updates }: {rules: string[]; updates: string[][]}
): string[][] => {
    const rulesPerPage = getRulePerPage(rules);
    const fixedInvalidUpdates: string[][] = [];

    updates.forEach((update) => {
        const programmaticallyBuiltUpdates: string[] = [];
        update.forEach((page) => {
            const pagesThatMustFollow = rulesPerPage[page];
            let indexToInsertPage: number | undefined;

            for (const programaticallyBuiltPage of programmaticallyBuiltUpdates) {
                if (pagesThatMustFollow && pagesThatMustFollow.includes(programaticallyBuiltPage)) {
                    indexToInsertPage = programmaticallyBuiltUpdates.indexOf(programaticallyBuiltPage)
                    break;
                }
            }

            if (indexToInsertPage !== undefined) {
                programmaticallyBuiltUpdates.splice(indexToInsertPage, 0, page)
            } else {
                programmaticallyBuiltUpdates.push(page)
            }
        })

        if (update.join(',') !== programmaticallyBuiltUpdates.join(',')) {
            fixedInvalidUpdates.push(programmaticallyBuiltUpdates)
        }
    });

    return fixedInvalidUpdates;
};

const mainPartTwo = (rawData: string) => {
    const formattedDay5Input = formatRawData(rawData);
    const fixedInvalidUpdates = fixInvalidUpdates(formattedDay5Input);
    const sum = findSumOfMiddleUpdates(fixedInvalidUpdates);
    console.log(sum);
};

mainPartTwo(exampleData)
mainPartTwo(rawDay5Input);