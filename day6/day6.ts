import { rawData } from "./day6Input";

interface LocationCoordinate {
    rowCoordinate: number;
    columnCoordinate: number;
}

type GaurdPosition = '^' | '>' | 'v' | '<';

interface Guard {
    coordinate: LocationCoordinate;
    position: GaurdPosition;
}

type Occupant = '.' | '#' | 'X'

interface PositionOccupant {
    coordinate: LocationCoordinate;
    occupant?: Occupant;
}

type LocationMap = (GaurdPosition | Occupant)[][];

class PatrolMap {
    guard: Guard
    locationMap: LocationMap
    stepsTaken: number = 1
    nextPositionOccupant: PositionOccupant

    constructor(locationMap: string[][]) {
        if (!this.isLocationMap(locationMap)) {
            throw('didnt give a valid location map')
        }
        this.locationMap = locationMap
        this.guard = this.findGuard()
        this.nextPositionOccupant = this.getNextPositionOccupant()
    }

    public patrol() {
        while (this.nextPositionOccupant.occupant) {
            this.walk()
        }
    }

    private walk() {
        while (this.nextPositionOccupant.occupant && ['.', 'X'].includes(this.nextPositionOccupant.occupant)) {
            this.guard.coordinate = this.nextPositionOccupant.coordinate

            if (this.nextPositionOccupant.occupant === '.') {
                this.locationMap[this.nextPositionOccupant.coordinate.rowCoordinate][this.nextPositionOccupant.coordinate.columnCoordinate] = 'X'
                this.stepsTaken++
            }

            this.nextPositionOccupant = this.getNextPositionOccupant()
        }

        if (this.nextPositionOccupant.occupant === '#') {
            this.guard.position = this.gaurdPositionMapper[this.guard.position]
            this.nextPositionOccupant = this.getNextPositionOccupant()
        }
    }

    private findGuard(): Guard {
        for (let rowCoordinate = 0; rowCoordinate < this.locationMap.length; rowCoordinate++) {
            for (let columnCoordinate = 0; columnCoordinate < this.locationMap[rowCoordinate].length; columnCoordinate++) {
                const occupant = this.locationMap[rowCoordinate][columnCoordinate];

                if (
                    occupant === '^' ||
                    occupant === '>' ||
                    occupant === 'v' ||
                    occupant === '<'
                ) {
                    this.locationMap[rowCoordinate][columnCoordinate] = 'X'

                    return {
                        coordinate: {
                            rowCoordinate, columnCoordinate
                        },
                        position: occupant
                    }
                }
            }
        }

        throw("Couldn't find guards starting location");
    }

    private getNextPositionOccupant(): PositionOccupant {
        const nextPotentialPositionOccupant  = {
            '^': {
                occupant: this.locationMap[this.guard.coordinate.rowCoordinate - 1]?.[this.guard.coordinate.columnCoordinate],
                coordinate: { rowCoordinate: this.guard.coordinate.rowCoordinate - 1, columnCoordinate: this.guard.coordinate.columnCoordinate}
            },
            '>': {
                occupant: this.locationMap[this.guard.coordinate.rowCoordinate]?.[this.guard.coordinate.columnCoordinate + 1],
                coordinate: { rowCoordinate: this.guard.coordinate.rowCoordinate, columnCoordinate: this.guard.coordinate.columnCoordinate + 1} 
            },
            'v': {
                occupant: this.locationMap[this.guard.coordinate.rowCoordinate + 1]?.[this.guard.coordinate.columnCoordinate],
                coordinate: { rowCoordinate: this.guard.coordinate.rowCoordinate + 1, columnCoordinate: this.guard.coordinate.columnCoordinate} 
            },
            '<': {
                occupant: this.locationMap[this.guard.coordinate.rowCoordinate]?.[this.guard.coordinate.columnCoordinate - 1],
                coordinate: { rowCoordinate: this.guard.coordinate.rowCoordinate, columnCoordinate: this.guard.coordinate.columnCoordinate - 1} 
            },
        }

        const nextPostitionOccupant = nextPotentialPositionOccupant[this.guard.position]

        if (this.isPositionOccupant(nextPostitionOccupant)) {
            return nextPostitionOccupant
        } else {
            throw('next position should not have a gaurd in it')
        }
    }

    private gaurdPositionMapper: Record<GaurdPosition, GaurdPosition> = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^',
    }

    private isLocationMap(map: string[][]): map is LocationMap {
        return map.every( row => row.every(position => ['X', '.', '#', '^', '>', 'v', '<'].includes(position)) )
    }

    private isPositionOccupant(entity: { coordinate: LocationCoordinate; occupant?: GaurdPosition | Occupant }): entity is PositionOccupant {
        return !!(entity.occupant && ['X', '.', '#'].includes(entity.occupant)) || !entity.occupant
    }
}

const exampleMap = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

const main = (map: string) => {
    const formattedMap = map.split('\n').map(row => row.split(''));

    const patrolMap = new PatrolMap(formattedMap)

    patrolMap.patrol();

    console.log(patrolMap.stepsTaken)
}

main(exampleMap)
main(rawData)