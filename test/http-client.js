const http = require('http')
const https = require('https')
const cosmosjs = require('@cosmostation/cosmosjs')


// try {
//     let url = 'https://lcd-do-not-abuse.cosmostation.io/bank/balances/cosmos1zj40lqa2u6htp6wlcd2drej45vhvv8xrzfua7c'
//     https.get(url, (res) => {
//         res.setEncoding('utf8')
//         let rawData = ''
//         res.on('data', (chunk) => { 
//             rawData += chunk
//         })
//         res.on('end', () => {
//             const parsedData = JSON.parse(rawData)
            
//             const data = parsedData.filter(asset => asset.denom === 'uatom').map(data => {
//                 // console.log('assets data: ', data)
                
//                 return data.amount
//             })

            
//             if ('') {
//                 console.log(data == '')
//             }
//         })
//     })

// } catch (e) {
//     console.error(e.message)
// }


const chainId = "cosmoshub-2"
const cosmos = cosmosjs.network("https://lcd-do-not-abuse.cosmostation.io", chainId)
cosmos.setPath("m/44'/118'/0'/0/0")
const phrase = 'creature skin anything heading connected circle surface announced unhappy voyage weigh paragraph exercise seven circle circle sent sky fuel greatest jump apple shake city'

const address = cosmos.getAddress(phrase)
const ecpairPriv = cosmos.getECPairPriv(phrase)
const hex = ecpairPriv.toString('hex')
const base64 = ecpairPriv.toString('base64')
const binary = ecpairPriv.toString('binary')


console.log(ecpairPriv)

console.log(hex)
console.log(base64)
console.log(binary)

console.log(Buffer.from(hex, 'hex'))
console.log(Buffer.from(base64, 'base64'))
console.log(Buffer.from(binary, 'binary'))
