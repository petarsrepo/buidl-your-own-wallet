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
app.all('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
})

// setup add endpoint action
app.all('/pages/addendpoint', (req, res) => {

  fs.writeFileSync("./dls/newendpoint.json", '{"endpoint":"' + req.body.newEndpoint + '"}');
  spawn('node', ['scripts/addendpoint.js']);
setTimeout(() => {
    res.sendFile('pages/addendpoint.html', {root: __dirname});
      }, 3000)
})

// setup create wallet action
app.all('/pages/create', (req, res) => {
spawn('node', ['scripts/create.js'])
setTimeout(() => {
  res.sendFile('pages/create.html', {root: __dirname})
  }, 3000)
})

// setup check balance action
app.all('/pages/balance', (req, res) => {
spawn('node', ['scripts/balance.js'])
setTimeout(() => {
  res.sendFile('pages/balance.html', {root: __dirname})
  }, 3000)
})

// setup add password action
app.all('/pages/addpassword', (req, res) => {

  fs.writeFileSync("./dls/newpassword.json", '{"password":"' + req.body.newPassword + '"}');
  spawn('node', ['scripts/addpassword.js']);
setTimeout(() => {
    res.sendFile('pages/addpassword.html', {root: __dirname});
      }, 3000)
})

// setup encrypt action
app.all('/pages/encrypt', (req, res) => {
spawn('node', ['scripts/encrypt.js'])
setTimeout(() => {
  res.sendFile('pages/encrypt.html', {root: __dirname})
  }, 3000)
})

// setup decrypt action
app.all('/pages/decrypt', (req, res) => {
spawn('node', ['scripts/decrypt.js'])
setTimeout(() => {
  res.sendFile('pages/decrypt.html', {root: __dirname})
  }, 3000)
})

// setup add private key action
app.all('/pages/addkey', (req, res) => {

  fs.writeFileSync("./dls/newkey.json", req.body.newkey);
  spawn('node', ['scripts/addkey.js']);
setTimeout(() => {
    res.sendFile('pages/addkey.html', {root: __dirname});
      }, 3000)
})

// setup transaction gas cost estimation
app.all('/pages/estimate', (req, res) => {

  fs.writeFileSync("./dls/estimate.json", '{"to":"' + req.body.receiver + '"}');
  spawn('node', ['scripts/estimate.js']);
setTimeout(() => {
    res.sendFile('pages/estimate.html', {root: __dirname});
      }, 3000)
})

// setup add private key action
app.all('/pages/receipt', (req, res) => {

  // fs.writeFileSync("./dls/receiver.json", '{"to":"' + req.body.txReceiver + '"}');
  fs.writeFileSync("./dls/txdetails.json", JSON.stringify({
    "to": req.body.txReceiver,
    "value": req.body.txValue,
    "data": req.body.txData,
    "gas": req.body.txGas
  }));
  spawn('node', ['scripts/send.js']);
setTimeout(() => {
    res.sendFile('pages/receipt.html', {root: __dirname});
      }, 3000)
})

// setup logo download
app.get('/buidl-yow-logo.png', (req, res) => {
res.download('buidl-yow-logo.png')
});

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

// setup new password download
app.get('/dls/newpassword.json', (req, res) => {
res.download('dls/newpassword.json')
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

// setup stylesheet access
app.get('/css/main.css', (req, res) => {
res.download('css/main.css')
});

module.exports = app
