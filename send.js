var Web3 = require('web3');
require("dotenv").config()
const fs = require("fs")
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

// prepare output
const sendTx = async () => {
const address = web3.eth.accounts.wallet.add(JSON.parse(fs.readFileSync('./dls/keys.json', 'utf8')).privateKey).address;
const receiver = fs.readFileSync("./dls/receiver.json", 'utf8')
const txValue = JSON.parse(fs.readFileSync("./dls/txdetails.json", 'utf8')).value
const txDataIn = JSON.parse(fs.readFileSync("./dls/txdetails.json", 'utf8')).data
const txGas = JSON.parse(fs.readFileSync("./dls/txdetails.json", 'utf8')).gas

// validate receiver and data input
var txData;
var validData = web3.utils.isHexStrict(txDataIn)
if (validData === true) {
  txData = txDataIn
} else {
  txData = ""
}
var valid = web3.utils.isHexStrict(receiver);
if (valid === true) {

// set transaction parameters
const transaction = await web3.eth.sendTransaction({
    from: address,
    to: receiver,
    value: txValue,
    data: txData,
    gas: txGas
}, function(error, receipt){
  console.log(receipt);

// write as page for web viewing
fs.writeFileSync("./pages/receipt.html", '<h2>Sending transaction...</h2><strong>From: </strong>' + address + '</br><strong>To:</strong> ' + receiver + '</br><strong>Gas: </strong>' + txGas + 'wei</br><strong>Value: </strong>' + txValue + 'wei,' + '</br><strong>Data: </strong>' + txData + '</br><strong>Hash: </strong>' + receipt + '</br><form action="../dls/receipt.json" method="GET">' + '<button id="receiptDL" onclick="loadReceiptDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location=`../`">Return home</button>');
fs.writeFileSync("./dls/receipt.json", JSON.stringify({
  from: address,
  to: receiver,
  value: txValue,
  data: txData,
  gas: txGas,
  hash: receipt
}));
});

} else {

// pass error if input is ivalid
fs.writeFileSync("./pages/receipt.html", "<strong>Input error: Invalid wallet address</strong>" + "</br>Confirm you have entered the receiving address correctly." + "</br>Don't forget to add '0x' as prefix to the receiving address to pass the validation!" + "</br>Example: 0x4281eCF07778Ee777C564a59048801330f3084eE</br>" + `<button id="tryAgain" onclick="window.location='../'">Try again</button>`);
}
}
sendTx()
