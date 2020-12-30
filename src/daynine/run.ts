import { data } from "./data";

const testdata = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

const preamble = 25;

export class DayNine {

    constructor() {
        this.numbersList = data.split("\n").map(num => parseInt(num, 10));
    }

    private numbersList: Array<number> = [];

    private getValid(test: number, testList: Array<number>): boolean {
        // console.info(`test = ${test}, dit = ${testList.toString()}`);
        for (let index1 = 0; index1 < testList.length; index1++) {
            for (let index2 = 0; index2 < testList.length; index2++) {
                if (index1 !== index2 && (testList[index1] + testList[index2] === test)) {
                    // console.info(`we hebben een goed nummer ${test}, want ${dit[index1]} + ${dit[index2]}`);
                    return true;
                }
            }
        }
        console.info(`dit nummer heeft geen resultaat! ${test}`);
        return false;
    }

    private getSum(start: number, target: number) {
        let sum = 0;
        const list = new Array<number>();
        const begin = start;
        while (sum < target) {
            sum += this.numbersList[start];
            list.push(this.numbersList[start])
            start++;
        }
        // console.info(`de som voor start ${begin} is ${sum}`);
        return { sum, list };
    }

    findInvalid(): number {
        // const numbersList = data.split("\n").map(num => parseInt(num, 10));
        for (let index = preamble; index < this.numbersList.length; index++) {
            if (!this.getValid(this.numbersList[index], this.numbersList.slice(index - preamble, index))) {
                return this.numbersList[index];
            }
        }
        // voor het geval we geen resultaat vinden
        return 0;
    }

    findWeakness() {
        const invalid = this.findInvalid();
        let index = 0;
        let sumResult = {
            sum: 0,
            list: [0]
        }
        while (sumResult.sum !== invalid && index < this.numbersList.length) {
            sumResult = this.getSum(index, invalid);
            index++;
        }
        sumResult.list.sort((a, b) => a - b);
        console.info(`de som is ${JSON.stringify(sumResult)}`);
        // laatste nummer via een tussenstap, omdat pop zegt dat het resultaat undefined kan zijn (wat in deze situatie nooit zal voorkomen, maar goed)
        // Math.min(...sumResult.list); en Math.max had ook gekund, geen idee wat sneller is wanneer de lijst heel lang wordt, ik denk sorteren, want dat gaat de lijst één keer af?
        const last = sumResult.list.pop() || 0;
        const weakness = sumResult.list[0] + last;
        console.info(`de zwakheid is ${weakness}`);
    }

}
