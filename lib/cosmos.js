const cosmosjs = require("@cosmostation/cosmosjs")
const config = require('./config')

const cosmos = cosmosjs.network(config.rest_node, config.chainId)
cosmos.setPath(config.path)

module.exports = cosmos