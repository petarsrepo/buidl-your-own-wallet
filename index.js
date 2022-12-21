const express = require('express');
const app = express();
const fs = require('fs')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const request = require('request');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
})

// app.post('/game', function (req, res) {
//     res.render('game', { name: req.body.name });
// });
app.get('/pages/create', (req, res) => {
spawn('node', ['create.js'])
setTimeout(() => {
  res.sendFile('pages/create.html', {root: __dirname})
  }, 3000)
})

app.get('/pages/balance', (req, res) => {
spawn('node', ['balance.js'])
setTimeout(() => {
  res.sendFile('pages/balance.html', {root: __dirname})
  }, 3000)
})

app.get('/pages/encrypt', (req, res) => {
spawn('node', ['encrypt.js'])
setTimeout(() => {
  res.sendFile('pages/encrypt.html', {root: __dirname})
  }, 3000)
})

app.get('/pages/decrypt', (req, res) => {
spawn('node', ['decrypt.js'])
setTimeout(() => {
  res.sendFile('pages/decrypt.html', {root: __dirname})
  }, 3000)
})

// new
app.post('/pages/addkey', (req, res) => {

  fs.writeFileSync("./dls/newkey.json", req.body.newkey);
  spawn('node', ['addkey.js']);
setTimeout(() => {
    res.sendFile('pages/addkey.html', {root: __dirname});
      }, 3000)
})

app.get('/dls/keys.json', (req, res) => {
res.download('dls/keys.json')
});

app.get('/dls/balance.json', (req, res) => {
res.download('dls/balance.json')
});

app.get('/dls/encryptedKeyStore.json', (req, res) => {
res.download('dls/encryptedKeyStore.json')
});

app.get('/dls/decryptedKeyStore.json', (req, res) => {
res.download('dls/decryptedKeyStore.json')
});

module.exports = app
// res.append('Content-Type', 'text/plain'); res.end('Hello world!');
