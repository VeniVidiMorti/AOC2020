import { data } from "./data";

const testdata = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const pathPairs = [{ right: 1, down: 1 },
{ right: 3, down: 1 },
{ right: 5, down: 1 },
{ right: 7, down: 1 },
{ right: 1, down: 2 }];

export class DayTree {

    countTrees(right: number = 3, down: number = 1): number {
        const slopeLines = data.split("\n");
        // const maxIndex = slopeLines[0].length;
        // const start = [0, 0];
        let position = 0;
        let line = 0;
        let trees = 0;
        slopeLines.forEach((slopeLine, index) => {
            if (index < line) {
                return;
            }
            if (slopeLine[position] === "#") {
                trees++;
            }
            line = line + down;
            position = (position + right) % slopeLine.length;
        });
        console.info(`bomen = ${trees}`);
        return trees;
    }

    moreCounting() {
        let totalTrees = 1;
        pathPairs.forEach(pair => {
            totalTrees = totalTrees * this.countTrees(pair.right, pair.down);
        });
        console.info(`totaal bomen is ${totalTrees}`);
    }

}