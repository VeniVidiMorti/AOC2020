import { data, testdata } from "./data";

export class DayTen {

    constructor() {
        this.buildAdapterList();
    }

    private adapterList = new Array<number>();

    private buildAdapterList() {
        this.adapterList = data
            .split("\n")
            .map(adapter => {
                return parseInt(adapter, 10);
            })
            .sort((a, b) => a - b);
    }

    countDifferences(): string {
        let previousAdapter = 0;
        let diffOne = 0;
        let diffThree = 1; // begint bij 1 vanwege de laatste stap naar ons apparaat
        let diffList = ""; // begin met nul voor het stopcontact, dat slaat niet ergens op, maar houd de regex van deel 2 makkelijk
        this.adapterList.forEach(adapter => {
            // voor de oplossing van deel 2:
            diffList += `${adapter - previousAdapter}`;
            // voor de oplossing van deel 1:
            switch (adapter - previousAdapter) {
                case 1:
                    diffOne++;
                    break;
                case 3:
                    diffThree++;
                    break;
                default:
                    // alles is dus één of drie blijkt
                    console.info(`niet één of drie!`);
                    break;
            }
            previousAdapter = adapter;
        });
        console.info(`verschil 1 is ${diffOne}, verschil 3 is ${diffThree}, het antwoord deel 1 is ${diffOne * diffThree}`);
        // voor de oplossing van deel 2:
        return diffList;
    }

    // deel 2 geen idee hoe ik dat moest aanpakken, uiteindelijk dankzij deze uitleg die ik soort van snap het wel gedaan 
    // https://gathering.tweakers.net/forum/list_message/65176016#65176016
    // Stel dat je adapters(inclusief outlet en jouw device) de volgende waardes hebben:
    // 0, 3, 4, 7, 8, 9, 12, 13, 14, 15, 18, 19, 20, 21, 22, 25

    // Dan zijn de jumps dus 3, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3.
    // Tot en met adapter met waarde 7 is er maar 1 pad(ik kan niets overslaan).
    // Van 7 naar 12 heb ik 2 mogelijkeden: ik gan 8 overslaan, of niet.
    // Van 12 naar 18 heb ik vier mogelijkheden: niets overslaan, alles overslaan, 13 overslaan of 14 overslaan.
    // Van 18 naar 25 heb ik 7 mogelijkheden.

    // Ik ga dus tellen hoeveel groepjes van 2, 3 en 4 enen ik heb(5 of meer kwam niet voor).Elke groep kan elk van n paden hebben, dus in het totaal moet ik al die mogelijkheden met elkaar vermeningvuldigen.
    // Hence, 2 ^ (aantal groepjes van 2) * 4 ^ (aantal groepjes van 3) * 7 ^ (aantal groepjes van 4)
    countCombos() {
        const list = this.countDifferences();
        // const list = "1111311113311131133111131331111";
        let counter = 1;
        list.split("3").forEach(onecombo => {
            // console.info(`lengte is ${onecombo.length}`);
            // in plaats van de switch had ik ook array.filter drie keer kunnen doen
            switch (onecombo.length) {
                case 2:
                    counter = counter * 2;
                    break;
                case 3:
                    counter = counter * 4;
                    break;
                case 4:
                    counter = counter * 7;
                    break;
                default:
                    if (onecombo.length > 4) {
                        // deze komt niet voor
                        console.info(`lengte groter dan 4!`);
                    }
                    break;
            }
        });
        // deze regexes werken niet, want je hebt elke keer het getal ervoor ook te pakken wat niet kan
        // het is vast werkend te krijgen door slimmer te zijn, maar ik heb geen zin meer en hierboven werkt
        // const groupTwo = Math.pow(2, list.match(/[^1]113/g)?.length || 0);
        // const groupThree = Math.pow(4, list.match(/[^1]1113/g)?.length || 0);
        // const groupFour = Math.pow(7, list.match(/[^1]?1111[^1]/g)?.length || 0);
        // console.info(`groupTwo = ${groupTwo}, groupThree = ${groupThree}, groupFour = ${groupFour}, ${list.match(/[^1]?1111[^1]/g)}`);
        console.info(`het aantal combinaties is ${counter}`);
    }


}