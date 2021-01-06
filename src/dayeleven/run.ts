import { data, testdata, testStable, testStablePartTwo } from "./data";

interface LookupStep { verticalStep: number; horizontalStep: number };

export class DayEleven {

    private currentSeatLayout = new Array<Array<string>>();
    private occupiedSeatsVar = 4;
    private partTwo = false;

    runLayoutChanges() {
        this.currentSeatLayout = this.parseData(data);
        const testStableString = this.partTwo ? this.parseData(testStablePartTwo).toString() : this.parseData(testStable).toString();
        let newSeatLayout = new Array<Array<string>>();
        let noLayoutChange = false;
        while (!noLayoutChange) {
            newSeatLayout = this.getNewLayout();
            noLayoutChange = this.compareLayouts(newSeatLayout);
            this.currentSeatLayout = newSeatLayout;
            // console.info("---------------------------------------------------------");
        }
        console.info(`het uiteindelijk aantal bezette stoelen is ${this.currentSeatLayout.toString().match(/#/g)?.length}`);
        console.info(`wat we gedaan hebben klopt? ${this.currentSeatLayout.toString() === testStableString}`);
    }

    runLayoutChangesPartTwo() {
        this.occupiedSeatsVar = 5;
        this.partTwo = true;
        this.runLayoutChanges();
    }

    private parseData(layout: string): Array<Array<string>> {
        const seatLayout = layout.split("\n").map(dataLine => {
            return dataLine.split("");
        });
        return seatLayout;
    }

    private getNewLayout(): Array<Array<string>> {
        const newSeatLayout = this.currentSeatLayout.map((seatRow, indexVert) => {
            return seatRow.map((seat, indexHor) => {
                return this.getNewValue(indexVert, indexHor);
            });
        });
        // console.info(`de oude indeling is ${this.currentSeatLayout.toString()}`);
        // console.info(`de nieuwe indeling is ${newSeatLayout.toString()}`);
        return newSeatLayout;
    }

    private getNewValue(indexVert: number, indexHor: number): string {
        const seatValue = this.getValue(indexVert, indexHor);
        if (seatValue === ".") {
            // vloeren veranderen niet
            return seatValue;
        }
        // voor de oplossing van deel twee is de regel voor de bezette stoelen anders
        const occupiedSeats = this.partTwo ? this.getOccupiedPartTwo2(indexVert, indexHor) : this.getOccupied(indexVert, indexHor);
        // If a seat is empty(L) and there are no occupied seats adjacent to it, the seat becomes occupied.
        if (seatValue === "L" && occupiedSeats === 0) {
            return "#";
        }
        // If a seat is occupied(#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
        if (seatValue === "#" && occupiedSeats >= this.occupiedSeatsVar) {
            return "L";
        }
        // Otherwise, the seat's state does not change.
        return seatValue;
    }

    private getValue(indexVert: number, indexHor: number) {
        if (indexVert < 0 || indexHor < 0) {
            // een index kleiner dan nul is voor het gemak vloer
            // console.info(`de waarde van stoel ${indexVert}, ${indexHor} is "."`);
            return ".";
        }
        if (this.currentSeatLayout[indexVert] && this.currentSeatLayout[indexVert][indexHor]) {
            // console.info(`de waarde van stoel ${indexVert}, ${indexHor} is ${this.currentSeatLayout[indexVert][indexHor]}`);
            return this.currentSeatLayout[indexVert][indexHor];
        }
        // als de index buiten de data valt geven we ook vloer terug
        return ".";
    }

    private getOccupied(indexVert: number, indexHor: number): number {
        let occupiedSeats = 0;
        for (let indexV = indexVert - 1; indexV <= indexVert + 1; indexV++) {
            for (let indexH = indexHor - 1; indexH <= indexHor + 1; indexH++) {
                // sla de stoel zelf over
                if (!(indexV === indexVert && indexH === indexHor) && this.getValue(indexV, indexH) === "#") {
                    occupiedSeats++;
                }
                // stoel is vloer of leeg
            }
        }
        // console.info(`aantal stoelen bezet voor ${indexVert}, ${indexHor} is ${occupiedSeats}`);
        return occupiedSeats;
    }

    private getOccupiedPartTwo2(indexVert: number, indexHor: number): number {
        let occupiedSeats = 0;
        const visibleLists = this.getVisibleLists(indexVert, indexHor);
        visibleLists.forEach((visibleList, index) => {
            // elke even index zijn de stoelen die vóór de stoel die we bekijken komen, draai die lijst dus om
            // console.info(`modulo is ${index % 2}`);
            if (index % 2 === 0) {
                visibleList.reverse();
            }
            // als de eerste stoel bezet is tellen we die op
            if (visibleList.find(seat => seat !== ".") === "#") {
                occupiedSeats++;
            }
        });
        return occupiedSeats;
    }

    private getVisibleLists(indexVert: number, indexHor: number): Array<Array<string>> {
        // we geven acht lijsten terug, twee voor elke as, één voor de stoel die bekeken wordt en één erna
        const lookupSteps = [{ verticalStep: 1, horizontalStep: 0 }, { verticalStep: 0, horizontalStep: 1 }, { verticalStep: 1, horizontalStep: 1 }, { verticalStep: 1, horizontalStep: -1 }];
        const visibleLists = new Array<Array<string>>();
        lookupSteps.forEach((lookupStep, index) => {
            let resultindex = index * 2;
            // elke index moet ook geinitialiseerd worden
            visibleLists[resultindex] = new Array<string>();
            visibleLists[resultindex + 1] = new Array<string>();
            const startpoints = this.getStartPoints(indexVert, indexHor, lookupStep);
            // zolang je vanaf het startpunt stoelen (of vloer natuurlijk) tegenkomt voegen we dat toe aan de lijst van dingen die vanaf die stoel te zien zijn
            while (this.currentSeatLayout[startpoints[0]] && this.currentSeatLayout[startpoints[0]][startpoints[1]]) {
                visibleLists[resultindex].push(this.currentSeatLayout[startpoints[0]][startpoints[1]]);
                if (startpoints[0] === indexVert && startpoints[1] === indexHor) {
                    // we zitten op de huidige stoel, gooi die uit het array en ga verder met deel 2
                    visibleLists[resultindex].pop();
                    resultindex++;
                }
                startpoints[0] += 1 * lookupStep.verticalStep;
                startpoints[1] += 1 * lookupStep.horizontalStep;
            }
        });
        if (visibleLists.length !== 8) {
            console.info(visibleLists.toString());
        }
        return visibleLists;
    }

    private getStartPoints(indexVert: number, indexHor: number, lookupStep: LookupStep): Array<number> {
        // geeft heet vertikale en het horizontale startpunt terug
        switch (`${lookupStep.verticalStep}${lookupStep.horizontalStep}`) {
            case "10":
                return [0, indexHor];
            case "01":
                return [indexVert, 0];
            case "11":
                const vert11 = indexVert - Math.min(indexVert, indexHor);
                const hor11 = indexHor - Math.min(indexVert, indexHor);
                return [vert11, hor11];
            case "1-1":
                const maxHor = this.currentSeatLayout[0].length - 1;
                const hor10 = Math.min(maxHor, indexVert + indexHor);
                const vert10 = (indexVert + indexHor) - hor10;
                return [vert10, hor10];
            default:
                // dit gebeurt nooit, maar houdt typescript blij
                return [0, 0];
        }
    }

    private compareLayouts(newSeatLayout: Array<Array<string>>): boolean {
        return this.currentSeatLayout.toString() === newSeatLayout.toString();
    }

}
