const Web3 = require("web3")
const fs = require("fs")
require("dotenv").config()
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

async function decrypt() {
    const wallet = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY)
    const decryptedJsonKey = await web3.eth.accounts.decrypt(
        JSON.parse(fs.readFileSync("./dls/encryptedKeyStore.json")),
        process.env.PRIVATE_KEY_PASS
    )
    console.log(decryptedJsonKey)
    fs.writeFileSync("./dls/decryptedKeyStore.json", JSON.stringify(decryptedJsonKey))
    fs.writeFileSync("./decrypt.html", JSON.stringify(decryptedJsonKey) + '<form action="/dls/decryptedKeyStore.json" method="GET">' + '<button id="decryptDL" onclick="loadDecryptDL()">Download</button>' + '</form>');
}

decrypt()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
