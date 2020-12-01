import { SumTo } from "./dayone/run";
import { data } from "./dayone/data";

const sumTo = new SumTo(data);
console.info(`het resultaat is ${sumTo.sumTwo(2020)}`);
console.info(`het tweede resultaat is ${sumTo.sumTree(2020)}`)