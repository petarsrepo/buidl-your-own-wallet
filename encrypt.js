const Web3 = require("web3")
const fs = require("fs")
require("dotenv").config()
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

async function encrypt() {
    const wallet = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY)
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASS,
        process.env.PRIVATE_KEY
    )
    console.log(encryptedJsonKey)
    fs.writeFileSync("./dls/encryptedKeyStore.json", JSON.stringify(encryptedJsonKey))
    fs.writeFileSync("./pages/encrypt.html", JSON.stringify(encryptedJsonKey) + '<form action="/dls/encryptedKeyStore.json" method="GET">' + '<button id="encryptDL" onclick="loadEncryptDL()">Download</button>' + '</form>');

}

encrypt()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
