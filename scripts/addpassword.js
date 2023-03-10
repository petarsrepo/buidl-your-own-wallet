require("dotenv").config()
const fs = require("fs")

// prepare output
async function addPass() {
let addpassword = fs.readFileSync("./dls/newpassword.json", 'utf8') || process.env.PRIVATE_KEY_PASS

// ammend .env for other script access
let endpointENV = "ENDPOINT=" + '"' + process.env.ENDPOINT + '"'
let pkeyENV = "PRIVATE_KEY=" + '"' + process.env.PRIVATE_KEY + '"'
let pkeypassENV = "PRIVATE_KEY_PASS=" + JSON.stringify(JSON.parse(addpassword).password)
let changesENV = endpointENV + "\n" + pkeyENV + "\n" + pkeypassENV
fs.writeFileSync("./.env", changesENV)

// write as page for web viewing
fs.writeFileSync("./pages/addpassword.html", 'Your new keystore encryption password is: ' + JSON.stringify(JSON.parse(addpassword).password) + '</br><strong><i>THIS DOES NOT AFFECT ALREADY ENCRYPTED KEYSTORES!</strong></i>' + '</br>Any new keystore file that you encrypt will use this password.' + '</form>' + '<button id="returnHome" onclick="window.location = `/`">Return home</button>');
}
addPass()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
