const Web3 = require("web3")
const fs = require("fs")
require("dotenv").config()
let web3 = new Web3(Web3.givenProvider || process.env.ENDPOINT);

// prepare output
let pkey = JSON.parse(fs.readFileSync('./dls/keys.json', 'utf8')).privateKey || process.env.PRIVATE_KEY
let pass = JSON.parse(fs.readFileSync("./dls/newpassword.json", 'utf8')).password || process.env.PRIVATE_KEY_PASS

async function encrypt() {
    let encryptedJsonKey = await web3.eth.accounts.encrypt(
        pkey,
        pass
    )

    // write as JSON for download
    fs.writeFileSync("./dls/encryptedKeyStore.json", JSON.stringify(encryptedJsonKey))

    // write as page for web viewing
    fs.writeFileSync("./pages/encrypt.html", JSON.stringify(encryptedJsonKey) + '<form action="/dls/encryptedKeyStore.json" method="GET">' + '<button id="encryptDL" onclick="loadEncryptDL()">Download</button>' + '</form>' + '<button id="returnHome" onclick="window.location = `/`">Return home</button>');
}

// call function and close
encrypt()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
