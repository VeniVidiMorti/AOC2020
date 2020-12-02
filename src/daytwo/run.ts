import { data } from "./data";

const testdata = `1-3 a: abcdea
1-3 b: cdefg
2-9 c: ccccccccc`;

export class DayTwo {

    firstCount() {
        let counter = 0;
        const passwordLines = data.split("\n");
        passwordLines.forEach(line => {
            const parsed = this.parseLine(line);
            const regex = new RegExp(parsed.letter, "g");
            const remaining = parsed.password.length - parsed.password.replace(regex, "").length;
            // console.info(`restant = ${password.replace(regex, "")} letter = -${letter}-`);
            if (remaining >= parsed.numbers[0] && remaining <= parsed.numbers[1]) {
                // console.info(`${password} is ok ${remaining}`);
                counter++;
                // } else {
                //     console.info(`${password} is niet ok ${remaining}`);
            }
        });
        console.info(`het aantal is ${counter}`);
    }

    secondCount() {
        let counter = 0;
        const passwordLines = data.split("\n");
        passwordLines.forEach(line => {
            const parsed = this.parseLine(line);
            const stringOne = (parsed.password[parsed.numbers[0] - 1] === parsed.letter);
            const stringTwo = (parsed.password[parsed.numbers[1] - 1] === parsed.letter);
            // console.info(`stringOne = ${stringOne}, strin2 ${stringTwo}`);
            // ik deed eerst dit waarbij de strings de letters zelf waren, maar ik vond hier https://github.com/patrickTingen/AdventOfCode/blob/master/2020/Day-02/day-02b.p
            // dat je natuurlijk veel makkelijker kan vergelijken of ze gelijk zijn aan het gevraagde teken of niet
            // if ((stringOne === parsed.letter || stringTwo === parsed.letter) && !(stringOne === parsed.letter && stringTwo === parsed.letter)) {
            if (stringOne !== stringTwo) {
                // console.info(`${parsed.password} is ok`);
                counter++;
                // } else {
                //     console.info(`${parsed.password} is niet ok`);
            }
        });
        console.info(`het aantal is ${counter}`);
    }

    private parseLine(line: string) {
        const numbers = line.split(" ")[0].split("-").map(num => parseInt(num, 10));
        const letter = line.split(" ")[1].replace(":", "");
        const password = line.split(" ")[2];
        return { numbers, letter, password };
    }

}
