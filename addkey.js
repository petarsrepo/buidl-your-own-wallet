var Web3 = require('web3');
require("dotenv").config()
const fs = require("fs")
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

// prepare output
var newkey = fs.readFileSync("./dls/newkey.json", 'utf8')
var valid = web3.utils.isHexStrict(newkey);
if (valid === true) {
const wallet = web3.eth.accounts.wallet.add(newkey)

// ammend .env for other script access
const endpointENV = "ENDPOINT=" + '"' + process.env.ENDPOINT + '"'
const pkeyENV = "PRIVATE_KEY=" + '"' + wallet.privateKey + '"'
const pkeypassENV = "PRIVATE_KEY_PASS=" + '"' + process.env.PRIVATE_KEY_PASS + '"'
const changesENV = endpointENV + "\n" + pkeyENV + "\n" + pkeypassENV
fs.writeFileSync("./.env", changesENV)

// write as page for web viewing
fs.writeFileSync("./dls/addkey.json", JSON.stringify(wallet));
fs.writeFileSync("./dls/keys.json", JSON.stringify(wallet));
fs.writeFileSync("./pages/addkey.html", JSON.stringify(wallet) + '<form action="../dls/addkey.json" method="GET">' + '<button id="addkeyDL" onclick="loadAddkeyDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location=`../`">Return home</button>');
} else {

// pass error if input is ivalid
fs.writeFileSync("./pages/addkey.html", "<strong>Input error: Invalid private key</strong>" + "</br>Confirm you have entered your private key correctly." + "</br>Don't forget to add '0x' as prefix to your private key to pass the validation!" + "</br>Example: 0xe515a43eed6a3f06221dff872f00eada462122949e2018abce8d0c8a539122c7</br>" + `<button id="tryAgain" onclick="window.location='../'">Try again</button>`);
}
