const http = require('https')
const express = require('express')
const router = express.Router()
const sha256 = require('js-sha256')

const config = require('../lib/config')
const logger = require('../lib/logger')

router.post('/getBlocknumber', (req, res) => {
    let url = config.rpc_node + '/status'
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
                return res.json({ code: 0, data: "" })
            }

            res.json({ code: 0, data: parsedData.result.sync_info.latest_block_height })
        })
    })
})

router.post('/getBlock', (req, res) => {
    if (!req.body || !req.body.height)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body)

    let url = config.rpc_node + '/block?height=' + req.body.height
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
                return res.json({ code: 0, data: null })
            }

            let txs = parsedData.result.block.data.txs
            if (txs.length > 0) {
                for (t in txs) {
                    txs[t] = sha256(Buffer.from(txs[t], 'base64'))
                }
            }

            res.json({ code: 0, data: txs })
        })
    })
})

router.post('/getTransaction', async function (req, res) {
    if (!req.body || !req.body.hash)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body)

    let url = config.rest_node + '/txs/' + req.body.hash
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
                return res.json({ code: 0, data: null })
            }

            const txvalue = parsedData.tx.value.msg[0].value
            let transaction = null
            if (parsedData.tx.value.msg[0].type === 'cosmos-sdk/MsgSend' && parsedData.logs[0].success === true) {
                transaction = {
                    send: txvalue.from_address,
                    to: txvalue.to_address,
                    token: txvalue.amount[0].denom,
                    value: txvalue.amount[0].amount,
                    txHash: parsedData.txhash,
                }
            }

            if (parsedData.tx.value.msg[0].type === 'cosmos-sdk/MsgMultiSend' && parsedData.logs[0].success === true) {
                transaction = {
                    send: txvalue.inputs[0].address,
                    to: txvalue.outputs[0].address,
                    token: txvalue.inputs[0].coins[0].denom,
                    value: txvalue.inputs[0].coins[0].amount,
                    txHash: parsedData.txhash,
                }
            }

            res.json({ code: 0, data: transaction })
        })
    })
})

module.exports = router