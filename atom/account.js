const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const randomWords = require('random-words')

const cosmos = require('../lib/cosmos')
const logger = require('../lib/logger')

router.use(bodyParser.json())

router.use(function timeLog(req, res, next) {
    logger.info('Request Original Url: ' + req.originalUrl)
    next()
})

router.post('/generateAccount', async function (req, res) {
    const words = randomWords(24)
    const mnemonic = JSON.stringify(words).replace(/\[|\]|\"/g, "").replace(/\,/g, " ")

    const address = cosmos.getAddress(mnemonic)
    const ecpairPriv = cosmos.getECPairPriv(mnemonic)

    res.json({
        code: 0,
        data: {
            address, ecpairPriv, mnemonic
        }
    })
})

router.post('/getAssetsByAccount', async function (req, res) {
    if (!req.body || !req.body.address)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body)

    const url
    const assets = await atom.asset.getAssetsByAccount(req.body.address, 0, 10)
    logger.info('Assets: ', JSON.stringify(assets))

    const data = assets.data.filter(asset => asset.name === 'PCX').map(data => {
        data.details.name = 'PCX'
        return data.details
    })
    res.json({code: 0, data: data ? data[0] : null})
})

module.exports = router