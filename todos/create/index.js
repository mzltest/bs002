let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function create(req) {
  let todo = arc.http.helpers.bodyParser(req)
  tdata=await data.get({table:'events','key':req.pathParameters.echannel})
  if(!data){
    t=await data.set({table:'events','key':req.pathParameters.echannel,events:[{t:Date.now(),m:todo.out}],finish:todo.finish})
  }
  else{
    tdata.finish=todo.finish
    tdata.events=tdata.events.push({t:Date.now(),m:todo.out})
    s=await data.set(tdata)
  }
  return {'ok':'true'}
}
