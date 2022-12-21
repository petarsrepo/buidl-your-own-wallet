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
app.get('/create', (req, res) => {
spawn('node', ['create.js'])
setTimeout(() => {
  res.sendFile('create.html', {root: __dirname})
  }, 3000)
})

app.get('/balance', (req, res) => {
spawn('node', ['balance.js'])
setTimeout(() => {
  res.sendFile('balance.html', {root: __dirname})
  }, 3000)
})

app.get('/encrypt', (req, res) => {
spawn('node', ['encrypt.js'])
setTimeout(() => {
  res.sendFile('encrypt.html', {root: __dirname})
  }, 3000)
})

app.get('/decrypt', (req, res) => {
spawn('node', ['decrypt.js'])
setTimeout(() => {
  res.sendFile('decrypt.html', {root: __dirname})
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
