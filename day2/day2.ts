// PART 1

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


// PART 2

const bruteForce = (reports: number[][]): number => {
    const safeReports = reports.filter((report) => {        
        let isSafe = false;
        for (let elementToRemove = -1; elementToRemove < report.length; elementToRemove++) {
            const adjustedReport = report.filter((_, index) => elementToRemove !== index)

            const isLevelAscending = (adjustedReport[1] - adjustedReport[0] > 0) ? true : false;

            for (let index = 1; index < adjustedReport.length; index++) {
                const levelSpike = adjustedReport[index] - adjustedReport[index - 1];
                const absoluteLevelSpike = Math.abs(levelSpike);

                if (absoluteLevelSpike === 0 || absoluteLevelSpike > 3) {
                    break;
                }

                if (isLevelAscending && levelSpike < 0) {
                    break;
                }

                if (!isLevelAscending && levelSpike > 0) {
                    break;
                }

                if (index === adjustedReport.length - 1) {
                    isSafe = true;
                }
            }

            if (isSafe) {
                break;
            }
        }

        return isSafe;
    })

    return safeReports.length;
}
