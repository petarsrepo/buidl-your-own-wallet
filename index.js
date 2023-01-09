const express = require('express');
const app = express();
const fs = require('fs')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const request = require('request');
var Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);
require('dotenv').config();

// setup server parameters and homepage
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
})

// setup add endpoint action
app.post('/pages/addendpoint', (req, res) => {

  fs.writeFileSync("./dls/newendpoint.json", '{"endpoint":"' + req.body.newEndpoint + '"}');
  spawn('node', ['scripts/addendpoint.js']);
setTimeout(() => {
    res.sendFile('pages/addendpoint.html', {root: __dirname});
      }, 3000)
})

// setup create wallet action
app.get('/pages/create', (req, res) => {
spawn('node', ['scripts/create.js'])
setTimeout(() => {
  res.sendFile('pages/create.html', {root: __dirname})
  }, 3000)
})

// setup check balance action
app.get('/pages/balance', (req, res) => {
spawn('node', ['scripts/balance.js'])
setTimeout(() => {
  res.sendFile('pages/balance.html', {root: __dirname})
  }, 3000)
})

// setup encrypt action
app.get('/pages/encrypt', (req, res) => {
spawn('node', ['scripts/encrypt.js'])
setTimeout(() => {
  res.sendFile('pages/encrypt.html', {root: __dirname})
  }, 3000)
})

// setup decrypt action
app.get('/pages/decrypt', (req, res) => {
spawn('node', ['scripts/decrypt.js'])
setTimeout(() => {
  res.sendFile('pages/decrypt.html', {root: __dirname})
  }, 3000)
})

// setup add private key action
app.post('/pages/addkey', (req, res) => {

  fs.writeFileSync("./dls/newkey.json", req.body.newkey);
  spawn('node', ['scripts/addkey.js']);
setTimeout(() => {
    res.sendFile('pages/addkey.html', {root: __dirname});
      }, 3000)
})

// setup transaction gas cost estimation
app.post('/pages/estimate', (req, res) => {

  fs.writeFileSync("./dls/receiver.json", req.body.receiver);
  spawn('node', ['scripts/estimate.js']);
setTimeout(() => {
    res.sendFile('pages/estimate.html', {root: __dirname});
      }, 3000)
})

// setup add private key action
app.post('/pages/receipt', (req, res) => {

  fs.writeFileSync("./dls/receiver.json", req.body.txReceiver);
  fs.writeFileSync("./dls/txdetails.json", JSON.stringify({
    "value": req.body.txValue,
    "data": req.body.txData,
    "gas": req.body.txGas
  }));
  spawn('node', ['scripts/send.js']);
setTimeout(() => {
    res.sendFile('pages/receipt.html', {root: __dirname});
      }, 3000)
})

// setup new endpoint download
app.get('/dls/newendpoint.json', (req, res) => {
res.download('dls/newendpoint.json')
});

// setup key storage download
app.get('/dls/keys.json', (req, res) => {
res.download('dls/keys.json')
});

// setup balance sheet download
app.get('/dls/balance.json', (req, res) => {
res.download('dls/balance.json')
});

// setup encrypted keystore download
app.get('/dls/encryptedKeyStore.json', (req, res) => {
res.download('dls/encryptedKeyStore.json')
});

// setup decrypted keystore download
app.get('/dls/decryptedKeyStore.json', (req, res) => {
res.download('dls/decryptedKeyStore.json')
});

// setup custom private key download
app.get('/dls/addkey.json', (req, res) => {
res.download('dls/addkey.json')
});

// setup transaction gas estimate download
app.get('/dls/estimate.json', (req, res) => {
res.download('dls/estimate.json')
});

// setup transaction receipt download
app.get('/dls/receipt.json', (req, res) => {
res.download('dls/receipt.json')
});

module.exports = app
