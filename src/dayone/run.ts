import { data } from "./data";

export class DayOne {

    // de opdracht is in een lijst met nummers de nummers te vinden die opgeteld een bepaalde waarde hebben, het antwoord is dan het product van die nummers
    // we doen geen moeite te voorkomen dat een element uit het array bij zichzelf opgeteld wordt
    // het is echter vrijwel zeker dat dat niet de bedoeling is, dus als het antwoord verkeerd is moet daarop gecontroleerd gaan worden
    sumTwo(target: number): number {
        // loop het gesorteerde array in twee richtingen af het idee dat als je bij de ene met het hoogste en de andere met het laagste getal begint je het snelste een resultaat hebt
        // ik heb het sorteren later weer uitgezet, want doordat we deze methode vanuit sumTree aanroepen gebeurt het elke keer wat dus juist niet efficiënt is
        // data.sort((a, b) => a - b);
        let indexAsc = 0;
        let result = 0;
        while (!result && indexAsc < data.length) {
            let indexDesc = data.length - 1;
            while (!result && indexDesc >= 0) {
                if (data[indexAsc] + data[indexDesc] === target) {
                    result = data[indexAsc] * data[indexDesc];
                }
                indexDesc--;
            }
            indexAsc++;
        }
        return result;
    }

    sumTree(target: number): number {
        // de foreach kan ook, sowieso is er geen merkbare tijd nodig voor de bewerking, ik vind alleen de while netter omdat die meteen eindigt als er een resultaat is
        let result = 0;
        let index = 0;
        while (!result && index < data.length) {
            const sumTwoResult = this.sumTwo((target - data[index]));
            if (sumTwoResult) {
                result = data[index] * sumTwoResult;
            }
            index++;
        }
        // data.forEach(one => {
        //     if (result) {
        //         return;
        //     }
        //     const sumTwoResult = this.sumTwo((target - one));
        //     if (sumTwoResult) {
        //         result = one * sumTwoResult;
        //     }
        // });
        return result;
    }

}
