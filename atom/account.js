const https = require('https')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const randomWords = require('random-words')

const cosmos = require('../lib/cosmos')
const logger = require('../lib/logger')
const config = require('../lib/config')

router.use(bodyParser.json())

router.use(function timeLog(req, res, next) {
    logger.info('Request Original Url: ' + req.originalUrl)
    next()
})

router.post('/generateAccount', async function (req, res) {
    const words = randomWords(24)
    const mnemonic = JSON.stringify(words).replace(/\[|\]|\"/g, "").replace(/\,/g, " ")

    const address = cosmos.getAddress(mnemonic)
    const ecpairPriv = cosmos.getECPairPriv(mnemonic).toString('hex')

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

    try {
        let url = config.rest_node + '/bank/balances/' + req.body.address
        https.get(url, (result) => {
            result.setEncoding('utf8')
            let rawData = ''
            result.on('data', (chunk) => { 
                rawData += chunk
            })

            result.on('end', () => {
                const parsedData = JSON.parse(rawData)
                const data = parsedData.filter(asset => asset.denom === 'uatom').map(data => {
                    return data.amount
                })

                res.json({ code: 0, data: data == '' ? null : data[0] })
            })
        })
    } catch (e) {
        logger.error(e.message)
    }  
})

module.exports = router