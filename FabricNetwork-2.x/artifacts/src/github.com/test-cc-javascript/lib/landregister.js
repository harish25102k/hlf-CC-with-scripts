'use strict';
const { Contract } = require('fabric-contract-api')

class Landregister extends Contract{
    async initLedger(ctx){
        console.log("==========================")
        return 'Chain code is up and running'

    }
    async registerland(ctx,args){
    const account = {
        id:args[0],
        file:args[1],
        owner:args[2],
        createdOn:Date.now(),
        latestTransaction:ctx.stub.getTxID()
    }
        await ctx.stub.putState(landId,Buffer.from(JSON.stringify(this.account)));
        return 'Sucessfully added record in blockchain'
}
async getdatabyid(ctx,args){
    let id=args[0]
    let response = await ctx.stub.getState(id)
    response = response.toString('UTF-8')
    return JSON.stringify(response)
}
async querybyname(ctx,args){
    let name = args[0]
   let queryString = {}
   queryString.selector = {"landOwner":name}
   let iterator = await ctx.stub.getQueryresult(JSON.stringify(queryString))
   let result = await this.getIteratorData(iterator)
   return JSON.stringify(result)
}
async getIteratorData(iterator){
    let resultArray = []
    while(true){
    let res = iterator.next()
    let resJson = {}
    if(res.value && res.value.value.toString()){
        resJson.key = res.value.key;
        resJson.value = JSON.parse(res.value.value.toString('utf-8'))
        resultArray.push(resJson)
        }
    if(res.done()){
    await iterator.close()
    return resultArray
}

}
         
    
}
}
module.exports = Landregister;