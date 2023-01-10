require('dotenv').config();
const endpoint = process.env.ENDPOINT;
const fs = require("fs")
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || endpoint);

// prepare output

const getbal = async () => {
const address = web3.eth.accounts.wallet.add(JSON.parse(fs.readFileSync('./dls/keys.json', 'utf8')).privateKey).address;
const balance = await web3.eth.getBalance(address);
const balanceGwei = web3.utils.fromWei(balance, 'gwei');
const balanceEths = web3.utils.fromWei(balance, 'ether');

// write as page for web viewing
fs.writeFileSync("./pages/balance.html", "The balance of your " + address + " wallet is: " + balance + ' wei\n Balance in gwei: ' + balanceGwei + ' gwei\n Balance in Ethers: ' + balanceEths + ' ETH' + '<form action="/dls/balance.json" method="GET">' + '<button id="balanceDL" onclick="loadBalanceDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location.href = "/";`">Return home</button>');

// write as JSON for download
fs.writeFileSync("./dls/balance.json", JSON.stringify({
  "address": address,
  "weiBalance": balance,
  "gweiBalance": balanceGwei,
  "ethersBalance": balanceEths
}));
};

// call function and close
getbal(address)
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
