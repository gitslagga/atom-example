const express = require('express')
const router = express.Router()

const cosmos = require('../lib/cosmos')
const logger = require('../lib/logger')

router.post('/assetsTransfer', async function (req, res) {
    if (!req.body || !req.body.phrase || !req.body.to || !req.body.value)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body.phrase, req.body.to, req.body.value)

    const address = cosmos.getAddress(req.body.phrase)
    const ecpairPriv = cosmos.getECPairPriv(req.body.phrase)

    const accountInfo = await cosmos.getAccounts(address)
    const stdSignMsg = cosmos.NewStdMsg({
        type: "cosmos-sdk/MsgSend",
        from_address: address,
        to_address: req.body.to,
        amountDenom: "uatom",
        amount: req.body.value,
        feeDenom: "uatom",
        fee: 5000, //5000,
        gas: 200000, //200000,
        memo: "",
        account_number: accountInfo.value.account_number,
        sequence: accountInfo.value.sequence
    })
    const signedTx = cosmos.sign(stdSignMsg, ecpairPriv)
    // logger.info('signedTx data: ', signedTx)

    const txResponse = await cosmos.broadcast(signedTx)
    // logger.info('txResponse response: ', txResponse)

    res.json({ code: 0, data: txResponse })
})

module.exports = router