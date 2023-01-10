const Web3 = require("web3")
const fs = require("fs")
require("dotenv").config()
let web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

// prepare output
let pass = JSON.parse(fs.readFileSync("./dls/newpassword.json", 'utf8')).password || process.env.PRIVATE_KEY_PASS

async function decrypt() {
    let decryptedJsonKey = await web3.eth.accounts.decrypt(
        JSON.parse(fs.readFileSync("./dls/encryptedKeyStore.json")),
        pass
    )

    // write as JSON for download
    fs.writeFileSync("./dls/decryptedKeyStore.json", JSON.stringify(decryptedJsonKey))

    // write as page for web viewing
    fs.writeFileSync("./pages/decrypt.html", JSON.stringify(decryptedJsonKey) + '<form action="/dls/decryptedKeyStore.json" method="GET">' + '<button id="decryptDL" onclick="loadDecryptDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location = `/`">Return home</button>');
}

// call function and close
decrypt()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
