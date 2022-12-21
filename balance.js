require('dotenv').config();
const endpoint = process.env.ENDPOINT;
const fs = require("fs")
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || endpoint);

const wallet = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)
const address = wallet.address;
const getbal = async () => {
const balance = await web3.eth.getBalance(address);
const balanceGwei = web3.utils.fromWei(balance, 'gwei');
const balanceEths = web3.utils.fromWei(balance, 'ether');
fs.writeFileSync("./pages/balance.html", "The balance of your " + address + "wallet is: " + balance + ' wei\n Balance in gwei: ' + balanceGwei + ' gwei\n Balance in Ethers: ' + balanceEths + ' ETH' + '<form action="/dls/balance.json" method="GET">' + '<button id="balanceDL" onclick="loadBalanceDL()">Download</button>' + '</form>');
fs.writeFileSync("./dls/balance.json", "The balance of your " + address + "wallet is: " + balance + ' wei\n Balance in gwei: ' + balanceGwei + ' gwei\n Balance in Ethers: ' + balanceEths + ' ETH');
};
getbal(wallet.address)
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
