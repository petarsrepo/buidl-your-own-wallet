const Web3 = require("web3")
const fs = require("fs")
require("dotenv").config()
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

// prepare output
async function decrypt() {
    const wallet = JSON.parse(fs.readFileSync('./dls/keys.json', 'utf8')).privateKey
    const decryptedJsonKey = await web3.eth.accounts.decrypt(
        JSON.parse(fs.readFileSync("./dls/encryptedKeyStore.json")),
        process.env.PRIVATE_KEY_PASS
    )
    console.log(decryptedJsonKey)

    // write as JSON for download
    fs.writeFileSync("./dls/decryptedKeyStore.json", JSON.stringify(decryptedJsonKey))

    // write as page for web viewing
    fs.writeFileSync("./pages/decrypt.html", JSON.stringify(decryptedJsonKey) + '<form action="/dls/decryptedKeyStore.json" method="GET">' + '<button id="decryptDL" onclick="loadDecryptDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location=`../`">Return home</button>');
}

// call function and close
decrypt()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
