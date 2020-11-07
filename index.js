const Discord = require("discord.js");
const bot = new Discord.Client();
const token = require("../ternarybot/token.json");
const request = require("request");

bot.on("ready", async () => {
    console.log("online");
});

bot.on("message", async message => {
    let prefix = "test!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (message.author.id === bot.user.id) return;

    if (cmd === "test!string") {
        if (args[0] === "number") {
            let count = Math.floor(Math.random() * 2000);
            let countDone = 0;
            let string = "";

            if(count === 0) letterCount = 1;

            while (countDone < count) {
                let toAdd = Math.floor(Math.random() * parseInt("9"));
                console.log(toAdd);
                string += toAdd;
                console.log(string);
                countDone = countDone + 1;

            }

            message.channel.send(string);
        }

        else if (args[0] === "help") {
            let embed = new Discord.MessageEmbed()
            .setColor("95ff87")
            .addField("test!string", "on its own will return up to 45 random letters in a string")
            .addField("test!string <number>", `test!string <number> will return a that number of letters\n- 0 or below will become 1\n- 46 or above will return 45\n- If you do not get a response, let me (rouxlmao) know`)
            .addField("test!string number", `will return up to 2000 numbers 1-9`)

            message.channel.send(embed);
        }
        
        else {
        let letterCount = Math.floor(Math.random() * 45);
        let lettersDone = 0;
        let string = "";
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        let limit;

        // if (args[0]) {
        //     limit = parseInt(args[0]);
        //     if (limit === NaN || limit === null) limit = letterCount; 
        //     if (limit > 45) limit = 45;
        //     if (limit < 0) limit === letterCount;
        // } else {
        //     limit = letterCount;
        // }

        limit = +args[0];
        limit = limit ? (limit > 45 ? 45 : limit < 0 ? ~~(Math.random() * 45) : limit) : ~~(Math.random() * 45);


        if (limit === 0) limit = letterCount;
        if(letterCount === 0) limit = 1;

        while (lettersDone < limit) {
            let toAdd = require("randomer.js").array(alphabet);
            console.log(toAdd);
            string += toAdd;
            console.log(string);
            lettersDone = lettersDone + 1;
        };

        message.channel.send(string);

    }


    }

    if (cmd === `${prefix}help`) {

        let helpEmbed = new Discord.MessageEmbed().setColor("95ff87")
        .addField(
            
            `Command List - Prefix: ${prefix}\nRunning StringerBot\n<> is necessary, [] is optional`,
            `\`test!string [max letters]\` -  Further info: ${prefix}string help
            \`test!help\` - Further info: None
            \`test!status\` - Futher info: None
            \`test!ship\` - Futher info: | to split text if you need spaces
            \`test!age <year/age> <number>\` - Futher info: None
            \`test!boom [dev]\` - Further info: None`
        )

        message.channel.send(helpEmbed)
    }

    if (cmd === `${prefix}status`) {
        if (message.author.id !== "767486226914607184") return message.channel.send("no.");

        bot.user.setActivity(args.join(" "), { type: "PLAYING"} );
        message.channel.send(`Status set to: Playing ${args.join(" ")}`)
    }

    if (cmd === `${prefix}ship`) {
        if(messageArray.includes("|")) {
            let todo = message.content.split("|");
            message.channel.send(`${todo[0].replace("test!ship ", "")} x ${todo[1]}\nCompatibility: ${Math.floor(Math.random() * 100)}%`)
        }

        else message.channel.send(`${args[0]} x ${args[1]}\nCompatibility: ${Math.floor(Math.random() * 100)}%`);
    }

    if (cmd === `${prefix}boom`) {
        let numbers = [
            Math.floor(Math.random() * 100), 
            Math.floor(Math.random() * 100), 
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100)
        ]

        let results = `\`results: ${numbers}\``;

        if (args[0] === "dev") {
            if (numbers.includes(7)) message.channel.send(`Boom!\n${results}`);
            else message.channel.send(`there is no 7 in the array\n${results}`);
        }

        else {
            if(numbers.includes(7)) message.channel.send("Boom!");
            else message.channel.send("there is no 7 in the array");
        }
    }

    if (cmd === `${prefix}age`) {
        if (args[0] === "year") {
            let birth = parseInt(args[1]);
            if (birth === NaN || birth === null || birth < 1903) message.channel.send("you are dead");
            else if(birth > new Date().getFullYear()) message.channel.send("you have not been born");
            else message.channel.send(`you are (most likely) ${parseInt(new Date().getFullYear()) - birth} years old`);
        }

        else if(args[0] === "age") {
            let birth = parseInt(args[1]);
            if (birth === NaN || birth === null || birth > 117) message.channel.send("you are dead");
            else if(birth < 0) message.channel.send("you have not been born");
            else message.channel.send(`you were (most likely) born in ${parseInt(new Date().getFullYear()) - birth}`);
        }

        else message.channel.send("not a function");
    }

    if (cmd === `${prefix}boomerang`) {
        let toInt = args.join(" ").split("|");
        let variables = {};
        
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
        
            else if (toCheck.startsWith("var")) {
                let list = toCheck.split("?");
                variables[list[1]] = list.slice(2).join(" ");
            }
        
            else if (toCheck.startsWith("show")) {
                let split = toCheck.split("?");
                return variables[split[1]];
            }
        
            else if (toCheck.startsWith("edit")) {
                let split = toCheck.split("?");
                variables[split[1]] = split.slice("2").join(" ");
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
        
                else if (split[1] === "array") {
                    return split.slice(2)[Math.floor(Math.random() * split.slice(2).length)];
                }   
        
                else return Math.floor(Math.random() * parseInt(split[1]));
            }
        
            else return "INVALID";
        }

        message.channel.send(toInt.map(x => check(x)).join(' '));
    }
});

bot.login(token.token);