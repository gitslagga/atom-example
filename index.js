const express = require('express')
const account = require('./atom/account')
const block = require('./atom/block')
const transaction = require('./atom/transaction')
const logger = require('./lib/logger')
const app = express()

app.use('/atom', [account, block, transaction])

app.listen(3000, () => console.log('atom restful api listening on port 3000'))

process.on('uncaughtException', (err) => {
    if (err) {
        logger.error(err)
    }
})

process.on('unhandledRejection', (err, promise) => {
    if (err) {
        logger.error(err)
    }
})