import moment from 'moment';

export const recordsCounter = (data) => {
    
    return data.filter(md => md.ic4proLanguage.key === localStorage.getItem("userlanguage")).length
}

export const todayTotalRecord = (data) => {
    return data.filter(n => n.ic4proRecordDate === moment().format('YYYYMMDD')).length
}


export const userActivityCounter = (data, appName) => {
    return data.filter(n => n.ic4proLanguage === localStorage.getItem("userlanguage") && n.ic4proApplication === appName)

}