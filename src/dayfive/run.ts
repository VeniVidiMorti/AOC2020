import { data } from "./data";

const testdata = `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

const rowNumbers = [64, 32, 16, 8, 4, 2, 1];
const columnNumbers = [4, 2, 1];

export class DayFive {

    getSeats() {
        const seatIds = data
            .split("\n")
            .map(seatCode => {
                return this.getSeatId(seatCode)
            });
        console.info(`het hoogtste nummer is ${Math.max(...seatIds)}`);
        const mySeat = seatIds
            .sort((a, b) => a - b)
            .filter((id, index) => {
                if (seatIds[index + 1] - id === 2) {
                    return true;
                }
                return false;
            });
        console.info(`mijn stoel is ${mySeat.toString()} plus 1`);
    }

    private getSeatId(seatCode: string): number {
        let row = 127;
        let column = 7;
        seatCode.split("").forEach((code, index) => {
            if (code === "F") {
                row -= rowNumbers[index];
            }
            if (code === "L") {
                column -= columnNumbers[index - 7];
            }
        });
        // console.info(`de kolom is ${row}, de rij is ${column} het product is ${row * 8 + column}`);
        return row * 8 + column;
    }

}