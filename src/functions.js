export const fitlerIT = (dataMo, language) => {
 
    var filteredColour = dataMo.filter(colour => colour.ic4proLanguage.key === language) || dataMo.filter(colour => colour.ic4proLanguage === language)
return filteredColour
}

// export const DupValidate = (dataVal, Value, typeId) => {
//     var validate = dataVal.filter(valid => valid.typeId === Value)

//     return 
// }
