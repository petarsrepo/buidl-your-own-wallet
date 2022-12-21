var Web3 = require('web3');
require("dotenv").config()
const fs = require("fs")
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

const keys = web3.eth.accounts.create();
console.log(keys);
fs.writeFileSync("./create.html", JSON.stringify(keys) + '<form action="/dls/keys.json" method="GET">' + '<button id="createDL" onclick="loadCreateDL()">Download</button>' + '</form>');
fs.writeFileSync("./dls/keys.json", JSON.stringify(keys));
const endpointENV = "ENDPOINT=" + '"' + process.env.ENDPOINT + '"'
const pkeyENV = "PRIVATE_KEY=" + '"' + keys.privateKey + '"'
const pkeypassENV = "PRIVATE_KEY_PASS=" + '"' + process.env.PRIVATE_KEY_PASS + '"'
const changesENV = endpointENV + "\n" + pkeyENV + "\n" + pkeypassENV

fs.writeFileSync("./.env", changesENV)
