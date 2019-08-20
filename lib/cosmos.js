const cosmosjs = require("@cosmostation/cosmosjs")
const config = require('./config')

const cosmos = cosmosjs.network(config.rest_node, config.chain_id)
cosmos.setPath(config.path)

module.exports = cosmos