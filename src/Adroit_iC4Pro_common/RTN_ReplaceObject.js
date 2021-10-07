export const objectReplacement = (operationsData) => {
    var arrayDatasForOperation = []

    operationsData.forEach(function (myItem) {
        var exactOps = myItem.ic4proOperation

        var relatedRecord = operationsData.filter(function (operations) {
            return operations.ic4proOperationID === exactOps;
        });

        var finalFunction = relatedRecord[0].ic4proFunction
        var replaceData = { ic4proOperation: finalFunction }
        var obj = Object.assign({}, myItem,  replaceData)
        arrayDatasForOperation.push(obj)
    });  
    return arrayDatasForOperation;
}
