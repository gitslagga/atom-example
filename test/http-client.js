const http = require('http')
const https = require('https')


try {
    let url = 'https://lcd-do-not-abuse.cosmostation.io/bank/balances/cosmos1zj40lqa2u6htp6wlcd2drej45vhvv8xrzfua7c'
    https.get(url, (res) => {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk) => { 
            rawData += chunk
        })
        res.on('end', () => {
            const parsedData = JSON.parse(rawData)
            
            const data = parsedData.filter(asset => asset.denom === 'uatom').map(data => {
                // console.log('assets data: ', data)
                
                return data.amount
            })

            
            if ('') {
                console.log(data == '')
            }
        })
    })

} catch (e) {
    console.error(e.message)
}
