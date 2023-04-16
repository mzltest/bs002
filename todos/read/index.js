const data = require('@begin/data')

exports.handler = async function read(req) {
  return await data.get({table:'events','key':req.pathParameters.echannel})
}
