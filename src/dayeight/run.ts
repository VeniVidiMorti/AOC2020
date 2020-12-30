import { data } from "./data";

const testdata = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

interface ProgramLine {
    action: string;
    number: number;
    run: boolean;
};

export class DayEight {

    constructor() {
        this.buildProgram();
    }

    private accumulator = 0;
    private program: Array<ProgramLine> = [];

    private runLine(index: number): number {
        // console.info(`straten regel ${JSON.stringify(this.program[index])}`);
        this.program[index].run = true;
        switch (this.program[index].action) {
            case "acc":
                this.accumulator += this.program[index].number;
                return index + 1;
            case "jmp":
                return index + this.program[index].number;
            default:
                let dit = index + 1;
                // console.info(`teruggeven ${dit}`);
                return dit;
        }
    }

    private buildProgram() {
        this.program = data.split("\n").map(line => {
            return {
                action: line.split(" ")[0],
                number: parseInt(line.split(" ")[1], 10),
                run: false
            };
        });
    }

    private reset() {
        // niet nodig voor oplossing 1, reset alle regels naar niet uitgevoerd
        this.program.forEach(line => {
            line.run = false;
        });
        this.accumulator = 0;
    }

    runProgram(): number {
        let index = 0;
        while (this.program[index] && !this.program[index].run) {
            // console.info(`regel = ${index}`);
            index = !this.program[index].run ? this.runLine(index) : index;
            // console.info(`nieuwe regel = ${index}`);
        }
        console.info(`klaar, laatste regel was ${JSON.stringify(this.program[index])}, teller is ${this.accumulator}`);
        return index; // niet nodig voor oplossing 1
    }

    fixProgram() {
        // Somewhere in the program, either a jmp is supposed to be a nop, or a nop is supposed to be a jmp. (No acc instructions were harmed in the corruption of this boot code.)
        for (const line of this.program) {
            if (line.action === "jmp" || line.action === "nop") {
                const oldAction = line.action;
                line.action = line.action === "jmp" ? "nop" : "jmp";
                this.reset();
                const result = this.runProgram();
                if (!this.program[result]) {
                    console.info(`gelukt! totaal = ${this.accumulator}`);
                    return;
                }
                // console.info(`dat was het niet`);
                line.action = oldAction;
            }
        }
    }

}