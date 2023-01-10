# ___`BUIDL your own wallet`___

A compilation of scripts to perform basic Web3 wallet management functions within a single interface. Create a wallet, check its balance, submit transactions, estimate gas costs, encrypt your private key to JSON keystore, and decrypt your JSON keystore to private key. Here are some quick demo walkthroughs of some of the core functionalities:

## ___`Wallet management demo`___

![buidl-your-own-wallet-demo](https://user-images.githubusercontent.com/24898023/209030207-64ae8033-e129-4c61-9834-2f2b83b75af1.gif)

## ___`Transaction processing demo`___

![buidl-your-own-wallet-transaction-demo](https://user-images.githubusercontent.com/24898023/211145501-8d27389a-ce96-489e-acdc-12660b0711e3.gif)


## Overview
The current implementation supports the following functions:
✅ Submit transactions
✅ Create a new wallet
✅ Estimate gas costs
✅ Check wallet balance
✅ Load external wallet from private key
✅ Encrypt private key to JSON keystore
✅ Decrypt JSON keystore to private key
✅ Set custom JSON keystore password
✅ Download every function output as JSON

### ___`Coming soon`___
📅 Transaction history
📅 Keystore file import
📅 Sign transactions
📅 Multi-wallet support
📅 Network selection

## 🚨!DISCLAIMER!🚨
>THIS WALLET DOES NOT COME WITH ROBUST SECURITY FEATURES AND USING IT OUTSIDE A TESTING OR DEVELOPMENT ENVIRONMENT IS STRONGLY DISCOURAGED. BY USING THIS WALLET YOU AGREE IT IS PROVIDED TO YOU WITHOUT WARRANTY AND IN NO EVENT SHALL THE AUTHOR OR COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, ARISING FROM YOUR INTERACTIONS WITH IT


## Prerequisites

👉 [Node.js](https://nodejs.org/en/)
👉 [Web3.js (installed automatically during initial setup)](https://github.com/web3/web3.js)
👉 [Dotenv (installed automatically during initial setup)](https://github.com/motdotla/dotenv)

## Initial setup

Clone this repo to a preferred location and install all dependencies by entering the following in CLI from your project's `root` folder:

```shell
// CLI
npm install
```

To use the functions within this script you will need a node `endpoint`. Get one for free via the [Chainstack console](https://console.chainstack.com/).

## Usage

### 1. Run the `index.js` script from your CLI and use the UI to perform the functions you need:

```shell
// CLI
node index
```

or alternatively via `npm`:

```shell
// CLI
npm run start
```

### 2. Set a `node endpoint` for your wallet to connect with from the `Change endpoint` section. Your wallet will not work otherwise. [Get a node endpoint for free from Chainstack here](https://console.chainstack.com/).

```shell
// .env
ENDPOINT="yOuR_eNdPoInT_URL_hErE"
```

### 3. Create a new wallet by pressing the `Create wallet` button. You can also download the output as a `JSON` file.

```js
// UI returns
# {
#   "address": '0xYoUrPuBlIcKeYhErE',
#   "privateKey": '0xYoUrPrIvAtEkEyHeRe',
# }
```

The script will also add the private key of your newly create wallet to the `.env` file automatically:

```shell
// .env file changes
ENDPOINT="yOuR_eNdPoInT_URL_hErE"
PRIVATE_KEY="0xYoUrPrIvAtEkEyHeRe"
PRIVATE_KEY_PASS="undefined"
```

### 4. Check the balance of your wallet by clicking the `Check balance` button. You can also download the output as a `JSON` file.

```js
// UI returns
# {
#   "address":"0xYoUrPuBlIcKeYhErE",
#   "weiBalance":"1337000000000000000"
#   "gweiBalance":"1337000000"
#   "ethersBalance":"1.337"
# }
```

### 5. Load an externally-created wallet with a private key import from the `Change wallet` section. You can also download the output as a `JSON` file.

```js
// UI returns
# {
#   "address": "0xYoUrPuBlIcKeYhErE",
#   "privateKey": "0xYoUrPrIvAtEkEyHeRe",
# }
```

The script will also add the private key of your newly create wallet to the `.env` file automatically:

```shell
// .env file changes
ENDPOINT="yOuR_eNdPoInT_URL_hErE"
PRIVATE_KEY="0xYoUrPrIvAtEkEyHeRe"
PRIVATE_KEY_PASS="undefined"
```

### 6. Estimate the gas costs of a transaction from the currently loaded wallet to another of your choice after entering it in the top field of the `Estimate gas costs` section. You can also download the output as a `JSON` file.

```js
// UI returns
# { "sender":"0xYoUrPuBlIcKeYhErE",
#   "receiver":"0xReCeIvErPuBlIcKeYhErE",
#   "estimate":21000
# }
```

### 7. Send a transaction with specific `from`, `to`, `value`, and `data` parameters, then get the hash as receipt from the `Create transaction` section. You can also download the receipt output as a `JSON` file.

```js
// UI returns
# {
#   "from":"0xYoUrPuBlIcKeYhErE",
#   "to":"0xReCeIvErPuBlIcKeYhErE",
#   "value":"1337",
#   "data":"0x80085",
#   "gas":"22222",
#   "hash":"0xYoUrTxReCeIpThAsHhErE"
# }
```

### 8. Set a custom password to encrypt your wallet keys as a `keystore` file from the `Change password` section.

```shell
// .env
ENDPOINT="yOuR_eNdPoInT_URL_hErE"
PRIVATE_KEY="0xYoUrPrIvAtEkEyHeRe"
PRIVATE_KEY_PASS="yOuRpAsSwOrDhErE"
```

### 9. Encrypt your wallet keys as a `keystore` file with the `Create keystore` button. You can also download the output as a `JSON` file.

// UI returns
```js
# {
#  "version": 3,
#  "id": 'ace5ff1c-c971-4b8c-b066-e6215f7420d9',
#  "address": '224a67b1e8a6b6b0ccb5deec44919ad983c82b12',
#  "crypto": {
#    "ciphertext": '423964514ee7eb5ee8f7c4047836e5743d12715889787325cc65b26b2d42ab7c',
#    "cipherparams": { "iv": 'b7b16712524da59ca7585bcd55263f4b' },
#    "cipher": 'aes-128-ctr',
#    "kdf": 'scrypt',
#    "kdfparams": {
#      "dklen": 32,
#      "salt": 'f99a05124ac9459d7fb045371bf975671e06f0125470c94990995e6e0a981312',
#      "n": 8192,
#      "r": 8,
#      "p": 1
#    },
#    mac: '888d45374904d553ce9ee60ee49a2c52829159322a36961e2bd5efb28dba58c3'
#  }
# }
```

This will be reflected in the generated `/dls/encryptedKeyStore.json` file

```js
// /dls/encryptedKeyStore.json file output
{"version":3,"id":"5b90f2fd-4eee-4979-a63d-82421f00ce3c","address":"a3d13afd97d3327e29178dbd8a1bc3fc639f363b","crypto":{"ciphertext":"1b69bc20f3b55ff3b4c32ebc0825c3c2d33daf1b1c080219db05fae9d806a0e6","cipherparams":{"iv":"773dd2ad24f0fb8973dd73184f0bf2b3"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"5b49ecae1740ceef08686468a6179c1d154d7fea1997e1bada81050096cb042a","n":8192,"r":8,"p":1},"mac":"8a6f36122eec78348be94fa1352ecf28be0f875b92d64924e3708b34f2440114"}}
```

### 10. Decrypt your `keystore` file with the `Decrypt keystore` button after placing it in its default location shown above the button. You can also download the output as a `JSON` file.

```js
// CLI script returns
# {
#   "address": '0xYoUrPuBlIcKeYhErE',
#   "privateKey": '0xYoUrPrIvAtEkEyHeRe',
# }
```

This will be reflected in the generated `/dls/decryptedKeyStore.json` file

```shell
// /dls/decryptedKeyStore.json file output
{"address":"0xYoUrPuBlIcKeYhErE","privateKey":"0xYoUrPrIvAtEkEyHeRe"}
```

### 11. ___`Coming soon`___
📅 Transaction history
📅 Keystore file import
📅 Sign transactions
📅 Multi-wallet support
📅 Network selection
