import { data } from "./data";

const testdata = `abc

a
b
c

ab
ac

a
a
a
a

b`;

export class DaySix {

    countAnswers() {
        const result = this.parseData().map(answers => {
            // kan vast netter
            const answersSet = new Set();
            answers.split("").forEach(answer => answersSet.add(answer));
            return answersSet.size;
        }).reduce((counter, current) => counter + current);
        console.info(`tellingen zijn ${result}`);
    }

    countAnswers2() {
        const result = this.paserData2().map(answers => {
            let overlap = new Array<string>();
            answers.map((answer, index) => {
                overlap = answer.split("").filter(answ => {
                    if (index === 0) {
                        return true
                    }
                    return overlap.includes(answ);
                });
            });
            return overlap.length;
        }).reduce((counter, current) => counter + current);
        console.info(`tellingen zijn ${result}`);
    }

    private parseData() {
        return data.split("\n\n").map(answers => answers.replace(/\n/g, ""));
    }

    private paserData2() {
        return data.split("\n\n").map(answers => answers.split("\n"));
    }

}
