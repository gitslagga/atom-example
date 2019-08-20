const express = require('express')
const router = express.Router()

const atom = require('../lib/atom')
const logger = require('../lib/logger')

async function assetsTransfer(from, key, to, value, memo) {
    const bobAssets = await atom.asset.getAssetsByAccount(from, 0, 10)
    logger.info('bobAssets: ', JSON.stringify(bobAssets))

    const free = bobAssets.data.filter(assets => assets.name === 'PCX').map(data => {
        return data && data.details.Free
    })

    const extrinsic = await atom.asset.transfer(to, 'PCX', value, memo)
    logger.info('Function: ', extrinsic.method.toHex())

    const addressFee = await extrinsic.getFee(from, { acceleration: 1 });
    if (free < (value + addressFee)) {
        logger.info(`${from} has ${free} amount, need ${value + addressFee} amount`)
        return {code: 400, msg: 'not enough amount'}
    }

    const result = await new Promise((resolve, reject) => {
        extrinsic.signAndSend(key, (error, response) => {
            if (error) {
                reject(error)
            } else if (response.status === 'Finalized') {
                resolve(response)
            }
        })
    })

    logger.info('result: ', result)
    return {code: 0, msg: 'success', data: {
        result: result.result,
        txHash: result.txHash,
        blockHash: result.blockHash,
        status: result.status
    }}
}


router.post('/assetsTransfer', async function (req, res) {
    if (!req.body || !req.body.from || !req.body.key || !req.body.to || !req.body.value) 
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body.from, req.body.to, req.body.value)

    const transfers = await assetsTransfer(req.body.from, req.body.key, req.body.to, req.body.value, req.body.memo)
    res.json(transfers)
})

module.exports = router