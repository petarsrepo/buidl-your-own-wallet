require("dotenv").config()
const fs = require("fs")

// prepare output
var addendpoint = fs.readFileSync("./dls/newendpoint.json", 'utf8')
console.log(addendpoint.endpoint);
// ammend .env for other script access
const endpointENV = "ENDPOINT=" + JSON.stringify(JSON.parse(addendpoint).endpoint)
const pkeyENV = "PRIVATE_KEY=" + '"' + process.env.PRIVATE_KEY + '"'
const pkeypassENV = "PRIVATE_KEY_PASS=" + '"' + process.env.PRIVATE_KEY_PASS + '"'
const changesENV = endpointENV + "\n" + pkeyENV + "\n" + pkeypassENV
fs.writeFileSync("./.env", changesENV)

// write as page for web viewing
fs.writeFileSync("./pages/addendpoint.html", 'Your new endpoint is: ' + JSON.stringify(JSON.parse(addendpoint).endpoint) + '</form>' + '<button id="returnHome" onclick="window.location=`../`">Return home</button>');
