# Web3.js wallet management

A compilation of scripts to perform basic Web3 wallet management functions - create, check balance, encrypt private key to JSON, and decrypt private key to JSON.

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

2. Run the `create.js` script from your CLI by entering:

```shell
// CLI
node create
```

or alternatively via `npm`:

```shell
// CLI
npm run create
```

3. The `create.js` script will return the following:

```shell
// CLI script returns
# {
#   address: '0xYoUrPuBlIcKeYhErE',
#   privateKey: '0xYoUrPrIvAtEkEyHeRe',
#   signTransaction: [Function: signTransaction],
#   sign: [Function: sign],
#   encrypt: [Function: encrypt]
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

4. Run the `balance.js` script to check your balance:

```shell
// CLI
node balance
```

or alternatively via `npm`:

```shell
// CLI
npm run balance
```

```shell
// CLI script returns
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

6. Run the `encrypt.js` script to encrypt your private key and export it as a protected `.encryptedKeyStore.json` file:

```shell
// CLI
node encrypt
```

or alternatively via `npm`:

```shell
// CLI
npm run encrypt
```

The script should return an output similar to this:

```shell
// CLI script returns
# {
#   version: 3,
#   id: 'ace5ff1c-c971-4b8c-b066-e6215f7420d9',
#   address: '224a67b1e8a6b6b0ccb5deec44919ad983c82b12',
#   crypto: {
#     ciphertext: '423964514ee7eb5ee8f7c4047836e5743d12715889787325cc65b26b2d42ab7c',
#     cipherparams: { iv: 'b7b16712524da59ca7585bcd55263f4b' },
#     cipher: 'aes-128-ctr',
#     kdf: 'scrypt',
#     kdfparams: {
#       dklen: 32,
#       salt: 'f99a05124ac9459d7fb045371bf975671e06f0125470c94990995e6e0a981312',
#       n: 8192,
#       r: 8,
#       p: 1
#     },
#     mac: '888d45374904d553ce9ee60ee49a2c52829159322a36961e2bd5efb28dba58c3'
#   }
# }

```

This will be reflected in the generated `.encryptedKeyStore.json` file

```shell
// .encryptedKeyStore.json file output
{"version":3,"id":"5b90f2fd-4eee-4979-a63d-82421f00ce3c","address":"a3d13afd97d3327e29178dbd8a1bc3fc639f363b","crypto":{"ciphertext":"1b69bc20f3b55ff3b4c32ebc0825c3c2d33daf1b1c080219db05fae9d806a0e6","cipherparams":{"iv":"773dd2ad24f0fb8973dd73184f0bf2b3"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"5b49ecae1740ceef08686468a6179c1d154d7fea1997e1bada81050096cb042a","n":8192,"r":8,"p":1},"mac":"8a6f36122eec78348be94fa1352ecf28be0f875b92d64924e3708b34f2440114"}}
```

7. Run the `decrypt.js` script to decrypt the `.encryptedKeyStore.json` file generated earlier and export the result to a `.decryptedKeyStore.json` file.

```shell
// CLI
node decrypt
```

or alternatively via `npm`:

```shell
// CLI
npm run decrypt
```

The script should return an output similar to this:

```shell
// CLI script returns
# {
#   address: '0xYoUrPuBlIcKeYhErE',
#   privateKey: '0xYoUrPrIvAtEkEyHeRe',
#   signTransaction: [Function: signTransaction],
#   sign: [Function: sign],
#   encrypt: [Function: encrypt]
# }
```

This will be reflected in the generated `.decryptedKeyStore.json` file

```shell
// .decryptedKeyStore.json file output
{"address":"0xYoUrPuBlIcKeYhErE","privateKey":"0xYoUrPrIvAtEkEyHeRe"}
```
