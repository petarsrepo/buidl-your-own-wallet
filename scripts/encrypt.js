const Web3 = require("web3")
const fs = require("fs")
require("dotenv").config()
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

// prepare output
async function encrypt() {
    const wallet = web3.eth.accounts.wallet.add(JSON.parse(fs.readFileSync('./dls/keys.json', 'utf8')).privateKey)
    console.log(wallet);
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASS,
        wallet.privateKey
    )
    console.log(encryptedJsonKey)

    // write as JSON for download
    fs.writeFileSync("./dls/encryptedKeyStore.json", JSON.stringify(encryptedJsonKey))

    // write as page for web viewing
    fs.writeFileSync("./pages/encrypt.html", JSON.stringify(encryptedJsonKey) + '<form action="/dls/encryptedKeyStore.json" method="GET">' + '<button id="encryptDL" onclick="loadEncryptDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location.href = "/";`">Return home</button>');

}

// call function and close
encrypt()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
