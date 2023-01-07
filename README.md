# buidl-your-own-wallet

A compilation of scripts to perform basic Web3 wallet management functions within a single interface. Create a wallet, check its balance, encrypt your private key to JSON keystore, and decrypt your JSON keystore to private key. Here's a quick demo walkthrough of the core functionality:

![buidl-your-own-wallet-demo](https://user-images.githubusercontent.com/24898023/209030207-64ae8033-e129-4c61-9834-2f2b83b75af1.gif)

## Overview
The current implementation supports the following functions:
- Create wallet
- Check balance
- Encrypt private key to JSON keystore
- Decrypt JSON keystore to private key
- Load external wallet with private key
- Estimate transaction gas costs
- Download every function output as JSON


 ___`Coming soon`___
- UI password entry
- Sign and submit transactions
- Keystore file import
- Network selection

## Prerequisites

1. [Node.js](https://nodejs.org/en/)
2. [Web3.js (installed automatically during initial setup)](https://github.com/web3/web3.js)
3. [Dotenv (installed automatically during initial setup)](https://github.com/motdotla/dotenv)

## Initial setup

Clone this repo to a preferred location and install all dependencies by entering the following in CLI from your project's `root` folder:

```shell
// CLI
npm install
```

To use the functions within this script you will need a node `endpoint`. Get one for free via the [Chainstack console](https://console.chainstack.com/).

## Usage

1. Create a `.env` file and enter your endpoint URL with the following format:

```shell
// .env
ENDPOINT="yOuR_eNdPoInT_URL_hErE"
```

2. Run the `index.js` script from your CLI and use the UI to perform the functions you need:

```shell
// CLI
node index
```

or alternatively via `npm`:

```shell
// CLI
npm run start
```

3. Create a new wallet by pressing the `Create wallet` button. You can also download the output as a JSON file.

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

Note that unless you have set up a PRIVATE_KEY_PASS key and value in your `.env` file the script will automatically add a line about it with `undefined` as value.

4. Check the balance of your wallet by clicking on the `Check balance` button. You can also download the output as a JSON file.

```js
// UI returns
# The balance of your wallet is: 20223750051062211493 wei
# Balance in gwei: 20223750051.062211493 gwei
# Balance in Ethers: 20.223750051062211493 ETH
```

5. Open your `.env` file and add a `PRIVATE_KEY_PASS` key if you don't have one already and set a preferred password for your encrypted `JSON` file:

```shell
// .env
ENDPOINT="yOuR_eNdPoInT_URL_hErE"
PRIVATE_KEY="0xYoUrPrIvAtEkEyHeRe"
PRIVATE_KEY_PASS="yOuRpAsSwOrDhErE"
```

6. Encrypt your private key to file with the `Encrypt private key to JSON keystore` button. You can also download the output as a JSON file.


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

7. Decrypt your JSON keystore file with the `Decrypt JSON keystore to private key` button. You can also download the output as a JSON file.

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

8. Load an externally-created wallet via private key import with the `Add private key` button. You can also download the output as a JSON file.

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

9. Estimate the gas costs of a transaction from the currently loaded to a receiving wallet of your choice with the `Estimate gas costs` button. You can also download the output as a JSON file.

```js
// UI returns
# { "sender":"0xYoUrPuBlIcKeYhErE",
#   "receiver":"0xYoUrPuBlIcKeYhErE",
#   "estimate":21000
# }
```

10. ___`Coming soon:`___
- UI password entry
- Sign and submit transactions
- Keystore file import
- Network selection
