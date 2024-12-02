// PART 1

/*
*/

import { day2Input } from './day2Input'


const formatRawInput = (rawInput: string): number[][] => {
    return rawInput.split('\n').map(line => line.split(' ').map(value => Number(value)))
}

const findSafeReports = (reports: number[][]): number => {
    const safeReports = reports.filter((report) => {
        let isSafe = true;

        const isLevelAscending = (report[1] - report[0] > 0) ? true : false;

        for (let index = 1; index < report.length; index++) {
            const levelSpike = report[index] - report[index - 1];
            const absoluteLevelSpike = Math.abs(levelSpike);

            if (absoluteLevelSpike === 0 || absoluteLevelSpike > 3) {
                isSafe = false;
                break;
            }

            if (isLevelAscending && levelSpike < 0) {
                isSafe = false;
                break;
            }

            if (!isLevelAscending && levelSpike > 0) {
                isSafe = false;
                break;
            }
        }

        return isSafe;
    })

    return safeReports.length;
}

const input = formatRawInput(day2Input)
console.log(findSafeReports(input))