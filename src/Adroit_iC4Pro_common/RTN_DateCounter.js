import moment from 'moment';

export const toDayCal = (data) => {
    
     return data.filter(n => n.ic4proRecordDate === moment().format('YYYYMMDD')).length 
}


export const sevenDaysCal = (data) => {
    return data.filter(n => parseInt(moment().subtract(6, 'days').format('YYYYMMDD')) <= parseInt(n.ic4proRecordDate)).length 

}

export const thirtyDaysCal = (data) => {
    return  data.filter(n => parseInt(moment().subtract(30, 'days').format('YYYYMMDD')) <= parseInt(n.ic4proRecordDate)).length 

}

export const oneYearCal = (data) => {
    return  data.filter(n => parseInt(moment().subtract(1, 'years').format('YYYYMMDD')) <= parseInt(n.ic4proRecordDate)).length 
}

export const oneYearPlusCal = (data) => {
    return  data.filter(n => parseInt(moment().subtract(2, 'years').format('YYYYMMDD')) - parseInt(n.ic4proRecordDate) >= 2).length 
}