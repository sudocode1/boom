const fs = require("fs");
const file = fs.readFileSync(`index.boom`).toString();
let toInt = file.split("|");
let e;

let variables = {

};
        
function check(toCheck, spl) {
    if (toCheck.startsWith("++")) {
        let math = toCheck.replace("++", "");
        let splitmath = math.split(spl);

        let toMath1 = parseFloat(splitmath[0]);
        let toMath2 = parseFloat(splitmath[2]);
        let calculation = splitmath[1];


        if (isNaN(toMath1)) {
            if (!variables.hasOwnProperty(splitmath[0])) return e = "INVALID VARIABLE";
            toMath1 = parseFloat(variables[splitmath[0]]);
        }

        if (isNaN(toMath2)) {
            if (!variables.hasOwnProperty(splitmath[2])) return e = "INVALID VARIABLE";
            toMath2 = parseFloat(variables[splitmath[2]]);
        }

        if (calculation === "+") return toMath1 + toMath2;
        else if (calculation === "-") return toMath1 - toMath2;
        else if (calculation === "*") return toMath1 * toMath2;
        else if (calculation === "/") return toMath1 / toMath2;
        else if (calculation === "**") return toMath1 ** toMath2;
        else return "not recognised " + splitmath;
        
        
    }

    else if (toCheck.startsWith("sqrt")) {
        let split = toCheck.split(spl);
        return Math.sqrt(parseFloat(split[1]));
    }

    else if (toCheck.startsWith("var")) {
        let list = toCheck.split(spl);

        if (list[3] === "boolean") {
            if (list[2] === "true") variables[list[1]] = true;
            else if (list[2] === "false") variables[list[1]] = false;
            else variables[list[1]] = null;
        }

        else if (list[3] === "integer" || list[3] === "int") {
            if (isNaN(parseInt(list[2]))) variables[list[1]] = null;
            else variables[list[1]] = parseInt(list[2]);
        }

        else if (list[3] === "float") {
            if (isNaN(parseFloat(list[2]))) variables[list[1]] = null;
            else variables[list[1]] = parseFloat(list[2]);
        }

        else if (list[2] === "function") {
            let toRun = list[3];
            let as = toRun.split(">");

            variables[list[1]] = as.map(x => check(x, "$")).join(" ");
        }

        else if (list[2] === "array") {
            variables[list[1]] = list.slice(3);
        }

        else variables[list[1]] = list.slice(2).join(" ");
    }

    else if (toCheck.startsWith("type")) {
        let split = toCheck.split(spl);
        return typeof(variables[split[1]]);
    }

    else if (toCheck.startsWith("show")) {
        let split = toCheck.split(spl);
        return variables[split[1]];
    }

    else if (toCheck.startsWith("edit")) {
        let list = toCheck.split(spl);

        if (list[2] === "function") {
            let toRun = list[3];
            let as = toRun.split(">");

            variables[list[1]] = as.map(x => check(x, "$")).join(" ");
        }

        else variables[list[1]] = list.slice(2).join(" ");
    }

    else if (toCheck.startsWith("if")) {
        let split = toCheck.split(spl);
        let send;

        if(split[2] === "=") {
            if (variables[split[1]] === split[3]) {
                let toRun = split[4];
                let as = toRun.split("/");

                return as.map(x => check(x, "@")).join(' ');

        }

        if (split[5]) {
                if (split[5] === "otherwise if") {
                    if (split[7] === "=") {
                        if(variables[split[6]] === split[8]) {
                            let toRun = split[9];
                            let as = toRun.split("/");
        
                            return as.map(x => check(x, "@")).join(" ");
                        }
                    }

                    else if (split[7] === "!=") {

                        if (variables[split[6]] !== split[8]) {
                            let toRun = split[9];
                            let as = toRun.split("/");
                
                            return as.map(x => check(x, "@")).join(" ");
                        }
                
                        
                    }
                
                    else if (split[7] === ">") {
                        if (variables[split[6]] > split[8]) {
                            let toRun = split[9];
                            let as = toRun.split("/");
                
                            return as.map(x => check(x, "@")).join(" ");
                        }
                    }
                
                    else if (split[7] === "<") {
                        if (variables[split[6]] < split[8]) {
                            let toRun = split[9];
                            let as = toRun.split("/");
                
                            return as.map(x => check(x, "@")).join(" ");
                        }
                    }
                }

                if (split[10] && split[10] === "otherwise") {
                    let toRun = split[11];
                    let as = toRun.split("/");

                    return as.map(x => check(x, "@")).join(" ");
                }
            
            }
    }

    else if (split[2] === "!=") {

        if (variables[split[1]] !== split[3]) {
            let toRun = split[4];
            let as = toRun.split("/");

            return as.map(x => check(x, "@")).join(" ");
        }

        
    }

    else if (split[2] === ">") {
        if (variables[split[1]] > split[3]) {
            let toRun = split[4];
            let as = toRun.split("/");

            return as.map(x => check(x, "@")).join(" ");
        }
    }

    else if (split[2] === "<") {
        if (variables[split[1]] < split[3]) {
            let toRun = split[4];
            let as = toRun.split("/");

            return as.map(x => check(x, "@")).join(" ");
        }
    }



        // const otherwiseI = split.findIndex((x, i) => x.startsWith('otherwise') && i >= 5);
        // if (otherwiseI > -1) {
        //     if (split[5 + otherwiseI] === "otherwise if") {

        //     }
        // }
    }

    else if(toCheck.startsWith("loop")) {
        let split = toCheck.split(spl);
        let amountrun = 0;
        let runtime = parseInt(split[2]);
        let stringBack = "";

        if (isNaN(runtime)) runtime = parseInt(variables[split[2]]);
        
        while (amountrun !== runtime)  {
            let toRun = split[1];
            let as = toRun.split("#");

            amountrun = amountrun + 1;
            stringBack += as.map(x => check(x, "&")).join(" ") + " ";
        }
        
        return stringBack;
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

        else if (split[1] === "var") {
            return Math.floor(Math.random() * parseInt(variables[split[2]]));
        }

        else return Math.floor(Math.random() * parseInt(split[1]));
    }

    else if(toCheck.startsWith("run")) {
        let split = toCheck.split(spl);
        let f = fs.readFileSync(`${split[1]}.boom`).toString();
        let i = f.split("|");

        return i.map(x => check(x, "?")).join(" ");
    }



    else if (toCheck.startsWith("while")) {
        let split = toCheck.split(spl);
        let stringBack = "";


        if(split[2] === "=") {
            while (variables[split[1]] === split[3]) {
                let toRun = split[4];
                let as = toRun.split("%");
                stringBack += as.map(x => check(x, ":")).join(" ") + " ";

        } 
        return stringBack;

    } else if (split[2] === "!=") {

            while (variables[split[1]] !== split[3]) {
                let toRun = split[4];
                let as = toRun.split("%");
                stringBack += as.map(x => check(x, ":")).join(" ") + " ";

        } 

        return stringBack;
    }

    }

    else if (toCheck.startsWith("*") && toCheck.endsWith("*")) {
        return;
    }

    else if(toCheck.startsWith("case")) {
        let split = toCheck.split(spl);
        // case?type?var?change

        if (split[1] === "upper" && split[3] === "change") variables[split[2]] = variables[split[2]].toUpperCase();
        else if (split[1] === "lower" && split[3] === "change") variables[split[2]] = variables[split[2]].toLowerCase();
        else if (split[1] === "lower") return variables[split[2]].toLowerCase();
        else if (split[1] === "upper") return variables[split[2]].toUpperCase();
        else return null;
    }

    else if (toCheck.startsWith("replace")) {
        let split = toCheck.split(spl);
        // replace?var?char?char

        if (!split[1] || !split[2]) return e = "ERROR: MISSING VARIABLES";
        var joinas;

        if (!split[3]) joinas = "";
        else joinas = split[3];

        variables[split[1]] = variables[split[1]].split(split[2]).join(joinas);
    }

    else if (toCheck.startsWith("split")) {
        let split = toCheck.split(spl);
        // split?var?name?change?param
        // split?var?name?param

        if (!split[1] || !split[2] || !split[3]) {
            return e = "ERROR: MISSING ARGUMENTS";
        }

        else if (!variables[split[2]]) {
            return e = "ERROR: VARIABLE DOES NOT EXIST"
        }

        else if (split[3] === "change") {
            variables[split[2]] = variables[split[2]].split(split[4].toString());
        }

        else {
            return variables[split[2]].split(split[3].toString());
        }

    }

    else if (toCheck.startsWith("search")) {
        let split = toCheck.split(spl);
        // search?varname?character

        if (!variables[split[1]]) return e = "ERROR: VARIABLE DOES NOT EXIST";
        else if(!split[2]) return e = "ERROR: MISSING PARAMETER";
        else return variables[split[1]].search(split[2]);
    }

    else if (toCheck.startsWith("file")) {
        let split = toCheck.split(spl);
        // file?read?filename
        // file?write?filename?data
        // file?append?filename?data

        let types = ["read", "write", "append"];
        if (!types.includes(split[1])) return e = "ERROR: NOT A TYPE";

        if (split[1] === types[0]) {
            // read
            return fs.readFileSync(`${split[2]}`);
        }

        else if (split[1] === types[1]) {
            // write
            fs.writeFileSync(`${split[2]}`, `${split[3]}`);
        }

        else if (split[1] === types[2]) {
            // append
            fs.appendFileSync(`${split[2]}`, `${split[3]}`);
        }
    }

    else if (toCheck.startsWith("sort")) {
        let split = toCheck.split(spl);
        // sort?var

        let arr = variables[split[1]];
        variables[split[1]] = arr.sort();
    }

    else if (toCheck.startsWith("json")) {
        let split = toCheck.split(spl);
        // json?file?object

        return JSON.parse(fs.readFileSync(`${split[1]}`, `utf-8`))[split[2]];
    }

    else if(toCheck.startsWith("hashlang")) {
        let split = toCheck.split(spl);

        var hash = JSON.parse(require("fs").readFileSync("./hash.json"));
        var read = split[1];
        var convert = read.split("#");
        var converted = convert.map(x => hash[x]).join("");

        return converted;
    }

    


    else return e = "ERROR: INVALID FUNCTION";
}

let returnback = toInt.map(x => check(x, "?")).join(" ");
if (typeof e === "string") returnback = e;
console.log(returnback);