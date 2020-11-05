const fs = require("fs");
const file = fs.readFileSync(`index.boom`).toString();
let toInt = file.split("|");
        
function check(toCheck) {
    if (toCheck.startsWith("++")) {
        let math = toCheck.replace("++", "");
        let splitmath = math.split("?");

        let toMath1 = parseFloat(splitmath[0]);
        let toMath2 = parseFloat(splitmath[2]);
        let calculation = splitmath[1];

        if (calculation === "+") return toMath1 + toMath2;
        else if (calculation === "-") return toMath1 - toMath2;
        else if (calculation === "*") return toMath1 * toMath2;
        else if (calculation === "/") return toMath1 / toMath2;
        else return "not recognised " + splitmath;
        
        
    }

    else if (toCheck.startsWith("+")) {
        return toCheck.replace("+", "");
    }

    else if (toCheck.startsWith("n")) return "\n";

    else if(toCheck.startsWith("date")) {
        let split = toCheck.split("?");

        if(split[1] === "year") return new Date().getFullYear();
        else if(split[1] === "month") return new Date().getMonth();
        else if(split[1] === "unix") return new Date().getTime();
        else if(split[1] === "json") return new Date().toJSON();
        else return Date();
    }
    
    else if(toCheck.startsWith("rng")) {
        let split = toCheck.split("?");

        if (!split[1]) {
            return "no max number set";
        }

        else return Math.floor(Math.random() * parseInt(split[1]));
    }

    else return "invalid";
}

console.log(toInt.map(x => check(x)).join(' '));