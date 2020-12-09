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

    private getBagsPartOne(searchBag: string | undefined): Array<string> {
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

    private getBagsPartTwo(searchBag: string | undefined): Array<{ quantity: string, type: string }> {
        // console.info(`zoeken naar ${searchBag}`);
        if (!searchBag) {
            return [];
        }
        const regex = new RegExp(`^${searchBag}.*[0-9]+`);
        const lines = testdata
            .split("\n")
            .filter(line => regex.test(line))
            .map(line => {
                // const dit = line.split("contain ")[1].split(",") || "";
                const bags = line.split("contain ")[1].split(",");
                const ret = bags.map(bag => {
                    return {
                        quantity: bag.trim().split(" ")[0].trim(),
                        type: bag.trim().split(" ").slice(1, 3).join(" ")
                    };
                });
                return ret;
            })//.concat()

        const ret = new Array<{ quantity: string, type: string }>();
        lines.forEach(line => {
            ret.push(...line);
        });
        console.info(`regels is ${JSON.stringify(ret, undefined, 2)}`);
        return ret;
    }

    countBags() {
        const setOne = new Set<string>();
        setOne.add("shiny gold");
        for (const searchBag of setOne) {
            // console.info(`zoektas = ${searchBag}`);
            this.getBagsPartOne(searchBag).forEach(newBag => {
                setOne.add(newBag);
            });
        }
        console.info(`het aantal tassen is ${setOne.size - 1}`);
    }

    secondCOunt() {
        // werkt niet en ik heb er geen zin meer in   
        const setTwo = new Set<{ quantity: string, type: string }>();
        setTwo.add({ quantity: "1", type: "shiny gold" });
        let totalBags = 0;
        for (const searchBag of setTwo) {
            // console.info(`zoektas = ${searchBag}`);
            this.getBagsPartTwo(searchBag.type).forEach(newBag => {
                console.info(`newbag is ${JSON.stringify(newBag)}`);
                if (newBag) {
                    totalBags += (+newBag.quantity * +searchBag.quantity);
                    setTwo.add(newBag);
                }
            });
        }
    }

}