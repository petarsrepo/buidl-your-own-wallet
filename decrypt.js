const Web3 = require("web3")
const fs = require("fs")
require("dotenv").config()
const web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

async function decrypt() {
    const wallet = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY)
    const decryptedJsonKey = await web3.eth.accounts.decrypt(
        JSON.parse(fs.readFileSync("./.encryptedKeyStore.json")),
        process.env.PRIVATE_KEY_PASS
    )
    console.log(decryptedJsonKey)
    fs.writeFileSync("./.decryptedKeyStore.json", JSON.stringify(decryptedJsonKey))
}

decrypt()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
