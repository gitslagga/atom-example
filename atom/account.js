const http = require('https')
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
    const ecpairpriv = cosmos.getECPairPriv(mnemonic).toString('hex')

    res.json({
        code: 0,
        data: {
            address, ecpairpriv, mnemonic
        }
    })
})

router.post('/getAssetsByAccount', async function (req, res) {
    if (!req.body || !req.body.address)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body)

    let url = config.rest_node + '/bank/balances/' + req.body.address
    http.get(url, (result) => {
        result.setEncoding('utf8')
        let rawData = ''
        result.on('data', (chunk) => { 
            rawData += chunk
        })

        result.on('end', () => {
            // logger.info('Response rawData: ', rawData)

            const parsedData = JSON.parse(rawData)
            if (parsedData.error && parsedData.error != "") {
                logger.info('Response parsedData: ', parsedData)
                return res.json({ code: 405, data: 0 })
            }
            
            const data = parsedData.filter(asset => asset.denom === 'uatom')
            res.json({ code: 0, data: data == "" ? 0 : parseInt(data[0].amount) })
        })
    })
})

router.post('/validatorAddress', async function (req, res) {
    if (!req.body || !req.body.address)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body)

    let url = config.rest_node + '/auth/accounts/' + req.body.address
    http.get(url, (result) => {
        result.setEncoding('utf8')
        let rawData = ''
        result.on('data', (chunk) => { 
            rawData += chunk
        })

        result.on('end', () => {
            // logger.info('Response rawData: ', rawData)

            const parsedData = JSON.parse(rawData)
            if (parsedData.error && parsedData.error != "") {
                logger.info('Response parsedData: ', parsedData)
                return res.json({ code: 405, data: false })
            }
            
            // atom address, but hasn't on blockchain
            // if (parsedData.value.address == "") {
            //     logger.info('Response parsedData: ', parsedData)
            //     return res.json({ code: 0, data: false })
            // }

            res.json({ code: 0, data: true })
        })
    })
})

module.exports = router