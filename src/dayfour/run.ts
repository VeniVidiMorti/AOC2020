import { data } from "./data";

const testdata = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const passportFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
const allowedEyeColours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

interface Passport {
    [key: string]: string
}

const PassportChecks = {
    byr: (year: string) => { return (+year >= 1920 && +year <= 2002) },
    iyr: (year: string) => { return (+year >= 2010 && +year <= 2020) },
    eyr: (year: string) => { return (+year >= 2020 && +year <= 2030) },
    hgt: (height: string) => {
        const heightNum = parseInt(height, 10);
        if (height.includes("cm")) {
            return (heightNum >= 150 && heightNum <= 193)
        }
        return (heightNum >= 59 && heightNum <= 76)
    },
    hcl: (hairColour: string) => { return hairColour.length === 7 && !!hairColour.match(/#[0-9a-f]{6}/) },
    ecl: (eyeColour: string) => { return allowedEyeColours.includes(eyeColour) },
    pid: (passportNumber: string) => { return passportNumber.length === 9 && !!passportNumber.match(/[0-9]{9}/) },
    cid: (cid: string) => { return true }
}

export class DayFour {

    checkPassportKeys(): void {
        let wrong = 0;
        let correct = 0;
        this.parseData().forEach(passport => {
            const missingFields = passportFields.filter(field => !Object.keys(passport).includes(field));
            if (!missingFields.length || missingFields.toString() === "cid") {
                correct += this.checkPassportValues(passport) === undefined ? 1 : 0;
                // } else {
                //     wrong++;
            }
        });
        // console.info(`${wrong} paspoorten zijn fout, ${correct} paspoorten zijn goed`);
        console.info(`${correct} paspoorten zijn goed`);
    }

    private checkPassportValues(passport: Passport): boolean | undefined {
        return Object.keys(passport)
            .map(key => {
                // typescript vind dit niet leuk, maar we weten dat alle keys een functie met dezelfde naam hebben
                // dit moet wel netter kunnen, als ik zin heb kijk ik daarnaar (misschien toch gewoon een switch moeten doen?)
                const result: boolean = PassportChecks[key](passport[key]);
                return result;
            })
            .filter((keyOk: boolean) => !keyOk)
            .pop()
    }

    private parseData(): Array<Passport> {
        const dataLines = data.split("\n");
        const passports = new Array<Passport>();
        let passport: Passport = {};
        dataLines.forEach(line => {
            if (!line) {
                passports.push(passport);
                passport = {};
                return;
            }
            Object.assign(passport, this.parseLine(line));
        });
        // en de laatste, want anders zit die er niet bij...
        passports.push(passport);
        // console.info(`paspoort regels = ${JSON.stringify(passports, undefined, 2)}`);
        return passports;
    }

    private parseLine(passportLine: string): Passport {
        const passportPart: Passport = {};
        passportLine.split(" ").forEach(keyPair => {
            const keyAndValue = keyPair.split(":");
            passportPart[keyAndValue[0]] = keyAndValue[1];
        });
        return passportPart;
    }

}