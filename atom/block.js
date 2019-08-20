const express = require('express')
const router = express.Router()

const cosmos = require('../lib/cosmos')
const logger = require('../lib/logger')

router.post('/getBlocknumber', (req, res) => {
    const subscription = cosmos.chain.subscribeNewHead().subscribe(result => {
        logger.info('subscribeNewHead result: ', result)

        subscription.unsubscribe()
        res.json({ code: 0, data: result })
    })
})

router.post('/rechargeList', async function (req, res) {
    if (!req.body || !req.body.blockNumber)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body: ', req.body)

    res.json({ code: 0 })
})

module.exports = router