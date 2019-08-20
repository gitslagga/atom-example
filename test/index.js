console.log("Starting")

const express = require('express')
const PORT = process.env.PORT || 3000
const cosmosjs = require("@cosmostation/cosmosjs")
var bodyParser = require("body-parser")

var app = express()
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

app.get("/", function (req, res) {
    res.send("hello. Do stuff with cosmos")
})

app.get("/make", function (req, res) {
    var theAddress = makeAddress()
    res.send(theAddress)
    // ["cosmos1sywpzk5f43hj3y0aylf3y4g0krk5ky90ps0j2j","ever home order clock earth band happy forty something relationship doctor box slight previous quiet found body reason entire above buffalo drove process necessary"]
})

app.get("/send", function (req, res) {
    var phrase = 'creature skin anything heading connected circle surface announced unhappy voyage weigh paragraph exercise seven circle circle sent sky fuel greatest jump apple shake city'
    var trans = sendTrans(phrase, res)
    // {"height":"0","txhash":"A0AFDA28139054BDFE065418DB2795F69B494FF996565FF7382493FAEFFC0905"}
})

function makeAddress() {
    var randomWords = require('random-words')
    var words = randomWords(24)
    var seedTotal = JSON.stringify(words).replace(/\[|\]|\"/g, "").replace(/\,/g, " ")


    const mnemonic = seedTotal
    const chainId = "cosmoshub-2"
    const cosmos = cosmosjs.network("https://lcd-do-not-abuse.cosmostation.io", chainId)
    cosmos.setPath("m/44'/118'/0'/0/0")
    const address = cosmos.getAddress(mnemonic)
    const ecpairPriv = cosmos.getECPairPriv(mnemonic)
    //console.log(address)

    //console.log(ecpairPriv)
    return [address, seedTotal]
}


function sendTrans(phrase, respObj) {

    const chainId = "cosmoshub-2"
    const cosmos = cosmosjs.network("https://lcd-do-not-abuse.cosmostation.io", chainId)
    cosmos.setPath("m/44'/118'/0'/0/0")
    const address = cosmos.getAddress(phrase)
    const ecpairPriv = cosmos.getECPairPriv(phrase)


    cosmos.getAccounts(address).then(data => {
        let stdSignMsg = cosmos.NewStdMsg({
            type: "cosmos-sdk/MsgSend",
            from_address: address,
            to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
            amountDenom: "uatom",
            amount: 10000,
            feeDenom: "uatom",
            fee: 5000,
            gas: 200000,
            memo: "",
            account_number: data.value.account_number,
            sequence: data.value.sequence
        })

        console.log(stdSignMsg)
        const signedTx = cosmos.sign(stdSignMsg, ecpairPriv)
        cosmos.broadcast(signedTx).then(response => respObj.send(response))
    })
}
