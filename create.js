var Web3 = require('web3');
require("dotenv").config()
const fs = require("fs")
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

// prepare output
const keys = web3.eth.accounts.create();

// write as page for web viewing
fs.writeFileSync("./pages/create.html", JSON.stringify(keys) + '<form action="/dls/keys.json" method="GET">' + '<button id="createDL" onclick="loadCreateDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location=`../`">Return home</button>');

// write as JSON for download
fs.writeFileSync("./dls/keys.json", JSON.stringify(keys));
const endpointENV = "ENDPOINT=" + '"' + process.env.ENDPOINT + '"'
const pkeyENV = "PRIVATE_KEY=" + '"' + JSON.parse(fs.readFileSync('./dls/keys.json', 'utf8')).privateKey + '"'
const pkeypassENV = "PRIVATE_KEY_PASS=" + '"' + process.env.PRIVATE_KEY_PASS + '"'
const changesENV = endpointENV + "\n" + pkeyENV + "\n" + pkeypassENV

// ammend .env for other script access
fs.writeFileSync("./.env", changesENV)
