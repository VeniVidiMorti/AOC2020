import { data } from "./data";

const testdata = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

export class DaySeven {

    private getBags(searchBag: string | undefined): Array<string> {
        // console.info(`zoeken naar ${searchBag}`);
        if (!searchBag) {
            return [];
        }
        const regex = new RegExp(`contain.*\\s${searchBag}\\s`);
        const lines = data
            .split("\n")
            .filter(line => regex.test(line))
            .map(line => {
                // console.info(`de regel is ${line}`);
                // line.match(/^([a-z ]*)bags.*/);
                // if (line.split(" bag").shift() !== line.match(/^[a-z]+\s[a-z]+/)?.toString()) {
                //     console.info(`de regel is ${line}`);
                // console.info(`split = ${line.split(" bag").shift()} match = ${line.match(/^[a-z]+\s[a-z]+/)}`);
                // }
                // const [bla, match] = line.match(/^([a-z ]*)bags.*/);
                // console.info(`match = ${line.match(/^([a-z ]*)bags.*/).pop()}`);
                return line.split(" bag").shift() || "";
            });
        // console.info(`regels is ${lines}`);
        return lines;
    }

    countBags() {
        // console.info(`${"vibrant plum bags contain 5 faded blue bags, 6 dotted blacks bags".match(/contain.*\sdotted black\s/)}`);
        let searchBags = ["shiny gold"];
        const set = new Set<string>();
        set.add("shiny gold");
        let bagCounter = 0;
        // while (searchBags.length) {
        //     const newBags = this.getBags(searchBags.shift());
        //     bagCounter += newBags.length;
        //     searchBags.push(...newBags);
        // }
        for (const searchBag of set) {
            // console.info(`zoektas = ${searchBag}`);
            this.getBags(searchBag).forEach(newBag => {
                set.add(newBag);
            });
        }
        console.info(`het aantal tassen is ${set.size - 1}`);
    }

}