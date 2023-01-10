require("dotenv").config()
const fs = require("fs")

// prepare output
async function addEndpoint() {
let addendpoint = fs.readFileSync("./dls/newendpoint.json", 'utf8') || process.env.ENDPOINT

// ammend .env for other script access
let endpointENV = "ENDPOINT=" + JSON.stringify(JSON.parse(addendpoint).endpoint)
let pkeyENV = "PRIVATE_KEY=" + '"' + process.env.PRIVATE_KEY + '"'
let pkeypassENV = "PRIVATE_KEY_PASS=" + '"' + process.env.PRIVATE_KEY_PASS + '"'
let changesENV = endpointENV + "\n" + pkeyENV + "\n" + pkeypassENV
fs.writeFileSync("./.env", changesENV)

// write as page for web viewing
fs.writeFileSync("./pages/addendpoint.html", 'Your new endpoint is: ' + JSON.stringify(JSON.parse(addendpoint).endpoint) + '</form>' + '<button id="returnHome" onclick="window.location = `/`">Return home</button>');
}
addEndpoint()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
