const fs = require("fs");
const file = fs.readFileSync(`index.boom`).toString();
let toInt = file.split("|");
let variables = {

};
        
function check(toCheck, spl) {
    if (toCheck.startsWith("++")) {
        let math = toCheck.replace("++", "");
        let splitmath = math.split(spl);

        let toMath1 = parseFloat(splitmath[0]);
        let toMath2 = parseFloat(splitmath[2]);
        let calculation = splitmath[1];

        if (calculation === "+") return toMath1 + toMath2;
        else if (calculation === "-") return toMath1 - toMath2;
        else if (calculation === "*") return toMath1 * toMath2;
        else if (calculation === "/") return toMath1 / toMath2;
        else return "not recognised " + splitmath;
        
        
    }

    else if (toCheck.startsWith("var")) {
        let list = toCheck.split(spl);
        variables[list[1]] = list.slice(2).join(" ");
    }

    else if (toCheck.startsWith("show")) {
        let split = toCheck.split(spl);
        return variables[split[1]];
    }

    else if (toCheck.startsWith("edit")) {
        let split = toCheck.split(spl);
        variables[split[1]] = split.slice("2").join(" ");
    }

    else if (toCheck.startsWith("if")) {
        let split = toCheck.split(spl);

        if(split[2] === "=") {
            if (variables[split[1]] === split[3]) {
                let thing = split[4];
                let as = thing.split("/");

                return as.map(x => check(x, "@")).join(' ');
            }
        }

        // if (split[2] === "=") {
        //     if (variables[split[1]] === split[3]) return true;
        //     else return false;
        // }

        // else if (split[2] === "!=") {
        //     if (variables[split[1]] !== split[3]) return true;
        //     else return false;
        // }

        // else if(split[2] === ">") {
        //     if (parseFloat(variables[split[1]]) > parseFloat(split[3])) return true;
        //     else return false;
        // }

        // else if(split[2] === "<") {
        //     if (parseFloat(variables[split[1]]) < parseFloat(split[3])) return true;
        //     else return false;
        // }

        // else if(split[2] === ">=") {
        //     if (parseFloat(variables[split[1]]) >= parseFloat(split[3])) return true;
        //     else return false; 
        // }

        // else if(split[2] === "<=") {
        //     if (parseFloat(variables[split[1]]) <= parseFloat(split[3])) return true;
        //     return false;
        // }

        // else return "NULL";
    }

    else if (toCheck.startsWith("+")) {
        return toCheck.replace("+", "");
    }

    else if (toCheck.startsWith("n")) return "\n";

    else if(toCheck.startsWith("date")) {
        let split = toCheck.split(spl);

        if(split[1] === "year") return new Date().getFullYear();
        else if(split[1] === "month") return new Date().getMonth();
        else if(split[1] === "unix") return new Date().getTime();
        else if(split[1] === "json") return new Date().toJSON();
        else return Date();
    }
    
    else if(toCheck.startsWith("rng")) {
        let split = toCheck.split(spl);

        if (!split[1]) {
            return "no max number set";
        }

        else if (split[1] === "array") {
            return split.slice(2)[Math.floor(Math.random() * split.slice(2).length)];
        }   

        else return Math.floor(Math.random() * parseInt(split[1]));
    }

    else return "INVALID";
}

console.log(toInt.map(x => check(x, "?")).join(' '));