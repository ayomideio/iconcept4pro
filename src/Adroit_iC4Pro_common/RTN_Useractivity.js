export const userActivity = (userActivityId, lang, appName, mode, chgDetails, counter,
    currentUser, recDate, recTime, prevCounter, workstation, ic4proPreviousStatus,
     ic4proPresentStatus, ic4proRelatedId, ic4proRelatedApp,ic4proRelatedAppType,useractivity
) => {

    useractivity({
        variables: {
            userActivityId: userActivityId,
            ic4proLanguage: lang,
            ic4proApplication: appName,
            ic4proFunction: mode,
            ic4proChangeDetails: chgDetails,
            ic4proCurrentCounter: counter,
            ic4proOperator: currentUser,
            ic4proRecordDate: recDate,
            ic4proRecordTime: recTime,
            ic4proPreviousCounter: prevCounter,
            ic4proRecordId: userActivityId,
            ic4proWorkstation: workstation,
            ic4proPreviousStatus: ic4proPreviousStatus,
            ic4proPresentStatus: ic4proPresentStatus,
            ic4proRelatedId: ic4proRelatedId,
            ic4proRelatedApp: ic4proRelatedApp,
            ic4proRelatedAppType: ic4proRelatedAppType
        }
    })

    
}



