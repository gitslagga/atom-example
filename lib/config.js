const configs = {
    'development': {
        rpc_node: 'https://cosmos.chorus.one:26657',
        rest_node: 'https://lcd-do-not-abuse.cosmostation.io',
        chain_id: 'cosmoshub-2',
        path: "m/44'/118'/0'/0/0",
        ding_token: 'fd8ed3b5cfcda0c4c9c133720a3865e6a9950a4bf1ef68888c3e7d937b8d1423'
    },
    'production': {
        rpc_node: 'http://127.0.0.1:26657',
        rest_node: 'http://127.0.0.1:1317',
        chain_id: 'cosmoshub-2',
        path: "m/44'/118'/0'/0/0",
        ding_token: 'fd8ed3b5cfcda0c4c9c133720a3865e6a9950a4bf1ef68888c3e7d937b8d1423'
    }
}

const config = configs[process.env.NODE_ENV]
module.exports = config