import { DayOne } from "./dayone/run";
import { data } from "./dayone/data";

import { DayTwo } from "./daytwo/run";

// const sumTo = new DayOne(data);
// console.info(`het resultaat is ${sumTo.sumTwo(2020)}`);
// console.info(`het tweede resultaat is ${sumTo.sumTree(2020)}`)

const dayTwo = new DayTwo();
dayTwo.firstCount();
dayTwo.secondCount();