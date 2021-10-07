import gql from "graphql-tag";

export const CREATE_PROCESS = gql`
  mutation CreateProcess($ENTITYLevel: String, $FULLDescription: String!, $JOBDescription: String, $PROCESSEntityId: String!, $SHORTDescription: String!, $SUPERIOREntityId: String) {
    CreateProcess(ENTITYLevel:$ENTITYLevel ,FULLDescription: $FULLDescription ,JOBDescription:$JOBDescription ,PROCESSEntityId: $PROCESSEntityId ,SHORTDescription: $SHORTDescription ,SUPERIOREntityId: $SUPERIOREntityId) {
     msg
     status
    }
  }
`;
export const UPDATE_PROCESS = gql`
  mutation UpdateProcess($ENTITYLevel: String, $FULLDescription: String, $JOBDescription: String, $PROCESSEntityId: String!, $SHORTDescription: String, $SUPERIOREntityId: String) {
    UpdateProcess(ENTITYLevel:$ENTITYLevel ,FULLDescription: $FULLDescription ,JOBDescription:$JOBDescription ,PROCESSEntityId: $PROCESSEntityId ,SHORTDescription: $SHORTDescription ,SUPERIOREntityId: $SUPERIOREntityId) {
     msg
     status
    }
  }
`;
export const CREATE_USERACTIVITY=gql`
  mutation createUseractivity($userActivityId:String!,$ic4proApplication:String!,$ic4proChangeDetails:String!,$ic4proLanguage:String!,
    $ic4proCurrentCounter:String!,
    $ic4proPreviousCounter:String!, $ic4proFunction:String!,$ic4proOperator:String!,$ic4proRecordDate:String!,$ic4proRecordTime:String!,
    $ic4proRecordId:String!,$ic4proWorkstation:String!,  $ic4proPreviousStatus:String!
    $ic4proPresentStatus :String!
    $ic4proRelatedId     :String!
    $ic4proRelatedApp:String!,
    $ic4proRelatedAppType:String!){
      createUseractivity(userActivityId:$userActivityId,ic4proApplication:$ic4proApplication,ic4proLanguage:$ic4proLanguage,
        ic4proChangeDetails:$ic4proChangeDetails,
        ic4proCurrentCounter:$ic4proCurrentCounter,ic4proPreviousCounter:$ic4proPreviousCounter,
        ic4proFunction:$ic4proFunction,ic4proOperator:$ic4proOperator,ic4proRecordDate:$ic4proRecordDate,
        ic4proRecordTime:$ic4proRecordTime,ic4proRecordId:$ic4proRecordId,ic4proWorkstation:$ic4proWorkstation,
        ic4proPreviousStatus:$ic4proPreviousStatus
    ic4proPresentStatus :$ic4proPresentStatus
    ic4proRelatedId     :$ic4proRelatedId
    ic4proRelatedApp:$ic4proRelatedApp,
    ic4proRelatedAppType:$ic4proRelatedAppType){
        userActivityId
    }
  }`
  ;


export const CREATE_SEVERITY = gql`
  mutation CreateSeverity(
    $OWNER: String
    $RESPONDENT: String
    $SEVIndicator: Int!
    $SEVLevel: String!
  ) {
    CreateSeverity(
      OWNER: $OWNER
      RESPONDENT: $RESPONDENT
      SEVIndicator: $SEVIndicator
      SEVLevel: $SEVLevel
    ) {
      msg
      status
    }
  }
`;
export const UPDATE_SEVERITY = gql`
  mutation UpdateSeverity(
    $OWNER: String
    $RESPONDENT: String
    $SEVIndicator: Int!
    $SEVLevel: String!
  ) {
    UpdateSeverity(
      OWNER: $OWNER
      RESPONDENT: $RESPONDENT
      SEVIndicator: $SEVIndicator
      SEVLevel: $SEVLevel
    ) {
      msg
      status
    }
  }
`;

export const DELETE_SEVERITY = gql`
  mutation DeleteSeverity($SEVLevel: String!) {
    DeleteSeverity(SEVLevel: $SEVLevel) {
      msg
      status
    }
  }
`;


export const CREATE_EXCEPTION = gql`
  mutation CreateException(
    $ACTION: String
    $EXCEPTION: String
    $EXCEPTIONCode: String!
    $EXCEPTIONCreator: String
    $EXCEPTIONName: String!
    $IC4SeverityId: String
    $IMPLICATION: String
    $LASTRunDate: DateTime
    $MESSAGE: String
    $NEXTRunTime: DateTime
    $PRIORITY: String!
    $REQUESTOR: String!
    $REVIEW: Int
    $RUNTime: String
    $RUNTimeInfo: String
    $RUNTimeMode: String
    ){
    CreateException(
      ACTION: $ACTION
      EXCEPTION: $EXCEPTION
      EXCEPTIONCode:$EXCEPTIONCode
      EXCEPTIONCreator:$EXCEPTIONCreator
      EXCEPTIONName:$EXCEPTIONName
      IC4SeverityId:$IC4SeverityId
      IMPLICATION:$IMPLICATION
      LASTRunDate:$LASTRunDate
      MESSAGE:$MESSAGE
      NEXTRunTime:$NEXTRunTime
      PRIORITY:$PRIORITY
      REQUESTOR:$REQUESTOR
      REVIEW:$REVIEW
      RUNTime:$RUNTime
      RUNTimeInfo:$RUNTimeInfo
      RUNTimeMode: $RUNTimeMode)
      {
     msg
     status
    }
  }
`;
export const UPDATE_EXCEPTION = gql`
  mutation UpdateException(
    $ACTION: String
    $EXCEPTION: String
    $EXCEPTIONCode: String!
    $EXCEPTIONCreator: String
    $EXCEPTIONName: String
    $IC4SeverityId: String
    $IMPLICATION: String
    $LASTRunDate: DateTime
    $MESSAGE: String
    $NEXTRunTime: DateTime
    $PRIORITY: String
    $REQUESTOR: String
    $REVIEW: Int
    $RUNTime: String
    $RUNTimeInfo: String
    $RUNTimeMode: String
    ){
    UpdateException(
      ACTION: $ACTION
      EXCEPTION: $EXCEPTION
      EXCEPTIONCode:$EXCEPTIONCode
      EXCEPTIONCreator:$EXCEPTIONCreator
      EXCEPTIONName:$EXCEPTIONName
      IC4SeverityId:$IC4SeverityId
      IMPLICATION:$IMPLICATION
      LASTRunDate:$LASTRunDate
      MESSAGE:$MESSAGE
      NEXTRunTime:$NEXTRunTime
      PRIORITY:$PRIORITY
      REQUESTOR:$REQUESTOR
      REVIEW:$REVIEW
      RUNTime:$RUNTime
      RUNTimeInfo:$RUNTimeInfo
      RUNTimeMode: $RUNTimeMode)
      {
     msg
     status
    }
  }
`;

export const DELETE_EXCEPTION = gql`
  mutation DeleteException($EXCEPTIONCode: String!) {
    DeleteException(EXCEPTIONCode: $EXCEPTIONCode) {
      msg
      status
    }
  }
`;

export const LOGIN_DETAILS = gql`
  mutation (
    $Username: String!
    $Password: String!
    ){
    tokenAuth(
      Username: $Username
      Password:$Password
	  )
      {
     token
    }
  }
`;

export const UPDATE_COMPONENTS=gql`
mutation updateComponent($key: String!,$parentKey:String!,$label: String!,$icon:String!,$labellanguage:String!,
  $url:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!){
    updateComponent(key:$key,parentKey:$parentKey,label:$label,labellanguage:$labellanguage,icon:$icon,
      url:$url,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
      ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
      ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
    component{
      key
     
    }
  }
}`;

export const CREATE_COMPONENTS = gql`
  mutation createComponent($key: String!,$parentKey:String!,$label: String!,$icon:String!,$ic4proLanguage:String!,
    $url:String!,$status:String!,$accessedby:String!,
    $ic4proRecordDate: String!,$ic4proRecordTime: String!,
    $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
    $ic4proRecordCounter: String!) {
    createComponent(key:$key,parentKey:$parentKey,label:$label,ic4proLanguage:$ic4proLanguage,icon:$icon,
      url:$url,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
      ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
      ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
        key
        accessedby
      }
  }
`;
export const CREATE_COMPONENTSCLONE = gql`
  mutation createComponentclone($key: String!,$parentKey:String!,$label: String!,$icon:String!,$ic4proLanguage:String!,
    $url:String!,$status:String!,$accessedby:String!,
    $ic4proRecordDate: String!,$ic4proRecordTime: String!,
    $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
    $ic4proRecordCounter: String!) {
    createComponentclone(key:$key,parentKey:$parentKey,label:$label,ic4proLanguage:$ic4proLanguage,icon:$icon,
      url:$url,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
      ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
      ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
        key
        accessedby
      }
  }
`;
export const DELETE_PRODUCTS=gql`
mutation deleteProduct($key:String!){
  deleteProduct(key:$key){
    product{
      label
    }
  }
}`;
export const CREATE_PRODUCTSDEL = gql`
mutation createProductdel($key: String!,$label: String!,$dateActivated: String!,
  $dateExpired: String!,$licenseCode: String!,$status: String!,$ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,$ic4proRecordCounter: String!,$accessedby: String!,
  $items: String!) {
  createProductdel(key: $key,label:$label,dateActivated:$dateActivated,
    dateExpired:$dateExpired,licenseCode:$licenseCode,status:$status,ic4proRecordDate:$ic4proRecordDate,ic4proRecordTime:$ic4proRecordTime,
    ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter,accessedby:$accessedby,
    items:$items){
      key
      accessedby
    }
}
`;



  export const CREATE_PRODUCTSRECORDCHANGES = gql`
  mutation createProductRecordChanges($key: String!,$label: String!,$dateActivated: String!,
    $dateExpired: String!,$licenseCode: String!,$status: String!,$ic4proRecordDate: String!,$ic4proRecordTime: String!,
    $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,$ic4proRecordCounter: String!,$accessedby: String!,
    $items: String!) {
      createProductRecordChanges(key: $key,label:$label,dateActivated:$dateActivated,
        dateExpired:$dateExpired,licenseCode:$licenseCode,status:$status,
        ic4proRecordDate:$ic4proRecordDate,ic4proRecordTime:$ic4proRecordTime,
        ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,ic4proWorkstation:$ic4proWorkstation,
        ic4proRecordCounter:$ic4proRecordCounter,accessedby:$accessedby,
        items:$items){
        key
        accessedby
      }
  }
`;

export const UPDATE_PRODUCTS=gql`
mutation updateProduct($key: String!,$label: String!,$dateActivated: String!,$ic4proLanguage:String!,
  $dateExpired: String!,$licenseCode: String!,$status: String!,$ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,$ic4proRecordCounter: String!,$accessedby: String!,
  $items: String!){
    updateProduct(key: $key,label:$label,dateActivated:$dateActivated,ic4proLanguage:$ic4proLanguage
      dateExpired:$dateExpired,licenseCode:$licenseCode,status:$status,
      ic4proRecordDate:$ic4proRecordDate,ic4proRecordTime:$ic4proRecordTime,
      ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,ic4proWorkstation:$ic4proWorkstation,
      ic4proRecordCounter:$ic4proRecordCounter,accessedby:$accessedby,
      items:$items){
        product{
    
      key
     
    }
  }
  
}`;

export const PRODUCTSHIS=gql`
mutation createProducthis($id:String!,$application:String!,$operation:String!,$operator:String!,$previousCounter:String!,
  $currentCounter:String!,,$recordId:String!,$recordDate:String!,$recordTime:String!,
  $workstation:String!){
    createProducthis(id:$id,application:$application,operation:$operation,operator:$operator,previousCounter:$previousCounter,
      currentCounter:$currentCounter,recordId:$recordId,recordDate:$recordDate,recordTime:$recordTime,
      workstation:$workstation){
   
      id
    
  }
}`;
export const CREATE_PRODUCTS=gql`
mutation createProduct($key: String!,$label: String!,$dateActivated: String!,$ic4proLanguage:String!,
  $dateExpired: String!,$licenseCode: String!,$status: String!,$ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,$ic4proRecordCounter: String!,$accessedby: String!,
  $items: String!){
    createProduct(key: $key,label:$label,dateActivated:$dateActivated,ic4proLanguage:$ic4proLanguage,
      dateExpired:$dateExpired,licenseCode:$licenseCode,status:$status,
      ic4proRecordDate:$ic4proRecordDate,ic4proRecordTime:$ic4proRecordTime,
      ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,ic4proWorkstation:$ic4proWorkstation,
      ic4proRecordCounter:$ic4proRecordCounter,accessedby:$accessedby,
      items:$items){

      key
     
    
  }
}`;


export const CREATE_PRODUCTSCLONE=gql`
mutation createProductclone($key: String!,$label: String!,$dateActivated: String!,$ic4proLanguage:String!,
  $dateExpired: String!,$licenseCode: String!,$status: String!,$ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,$ic4proRecordCounter: String!,$accessedby: String!,
  $items: String!){
    createProductclone(key: $key,label:$label,dateActivated:$dateActivated,ic4proLanguage:$ic4proLanguage,
      dateExpired:$dateExpired,licenseCode:$licenseCode,status:$status,
      ic4proRecordDate:$ic4proRecordDate,ic4proRecordTime:$ic4proRecordTime,
      ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,ic4proWorkstation:$ic4proWorkstation,
      ic4proRecordCounter:$ic4proRecordCounter,accessedby:$accessedby,
      items:$items){

      key
     
    
  }
}`;


export const CREATE_MODULES = gql`
mutation createModule($key: String!,$parentKey:String!,$label: String!,$icon:String!,$ic4proLanguage:String!,
  $url:String!,$items:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
  createModule(key:$key,parentKey:$parentKey,label:$label,ic4proLanguage:$ic4proLanguage,icon:$icon,
    url:$url,items:$items,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
    ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
    ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      key
      accessedby
    }
}
`;





export const CREATE_MODULESCLONE = gql`
mutation createModuleclone($key: String!,$parentKey:String!,$label: String!,$icon:String!,$ic4proLanguage:String!,
  $url:String!,$items:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
  createModuleclone(key:$key,parentKey:$parentKey,label:$label,ic4proLanguage:$ic4proLanguage,icon:$icon,
    url:$url,items:$items,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
    ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
    ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      key
      accessedby
    }
}
`;

export const UPDATE_MODULES=gql`
mutation updateModule($key: String!,$parentKey:String!,$label: String!,$icon:String!,$ic4proLanguage:String!,
  $url:String!,$items:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!){
    updateModule(key:$key,parentKey:$parentKey,label:$label,icon:$icon,ic4proLanguage:$ic4proLanguage,
      url:$url,items:$items,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
      ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
      ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
    module{
      key
     
    }
  }
}`;


export const CREATE_MODULESRECORDCHANGES = gql`
mutation createModulerecordchanges($key: String!,$parentKey:String!,$label: String!,$icon:String!,
  $url:String!,$items:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
    createModulerecordchanges(key:$key,parentKey:$parentKey,label:$label,icon:$icon,
      url:$url,items:$items,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
      ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
      ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      key
      accessedby
    }
}
`;
export const CREATE_COMPONENTSRECORDCHANGES = gql`
mutation createComponentrecordchanges($key: String!,$parentKey:String!,$label: String!,$icon:String!,
  $url:String!,$items:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
    createComponentrecordchanges(key:$key,parentKey:$parentKey,label:$label,icon:$icon,
      url:$url,items:$items,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
      ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
      ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      key
      accessedby
    }
}
`;
export const DELETE_MODULES=gql`
mutation deleteModule($key:String!){
  deleteModule(key:$key){
    module{
      label
    }
  }
}`;
export const DELETE_COMPONENTS=gql`
mutation deleteComponent($key:String!){
  deleteComponent(key:$key){
    component{
      key
    }
  }
}`;
export  const CREATE_MODULESDEL = gql`
mutation createModuledel($key: String!,$parentKey:String!,$label: String!,$icon:String!,
  $url:String!,$items:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
  createModuledel(key:$key,parentKey:$parentKey,label:$label,icon:$icon,
    url:$url,items:$items,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
    ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
    ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      key
      accessedby
    }
}
`;

export  const CREATE_COMPONENTSDEL = gql`
mutation createComponentdel($key: String!,$parentKey:String!,$label: String!,$icon:String!,
  $url:String!,$items:String!,$status:String!,$accessedby:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
  createComponentdel(key:$key,parentKey:$parentKey,label:$label,icon:$icon,
    url:$url,items:$items,status:$status,accessedby:$accessedby,ic4proRecordDate:$ic4proRecordDate,
    ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
    ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      key
      accessedby
    }
}
`;
export  const CREATE_USERGROUPS = gql`
mutation createUsergroup($groupId:String!,$groupName:String!,$groupDescription:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
  createUsergroup(groupId:$groupId,groupName:$groupName,groupDescription:$groupDescription,ic4proRecordDate:$ic4proRecordDate,
    ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
    ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      groupId
      
    }
}
`;
export  const UPDATE_USERGROUPS = gql`
mutation updateUsergroup($groupId:String!,$groupName:String!,$groupDescription:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
  updateUsergroup(groupId:$groupId,groupName:$groupName,groupDescription:$groupDescription,ic4proRecordDate:$ic4proRecordDate,
    ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
    ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
      usergroup{
        groupId
      }
    }
  }
`;
export  const CREATE_INSTALLEDLANGUAGE = gql`
mutation createInstalledLanguage($key:String!,$language:String!,
  $ic4proRecordDate: String!,$ic4proRecordTime: String!,
  $ic4proOperator: String!,$ic4proOperation: String!,$ic4proWorkstation: String!,
  $ic4proRecordCounter: String!) {
    createInstalledLanguage(key:$key,language:$language,ic4proRecordDate:$ic4proRecordDate,
    ic4proRecordTime:$ic4proRecordTime,ic4proOperator:$ic4proOperator,ic4proOperation:$ic4proOperation,
    ic4proWorkstation:$ic4proWorkstation,ic4proRecordCounter:$ic4proRecordCounter){
   key
      
    }
  }
`;



export const CREATE_DESIGNATE = gql`
mutation createDesignate( $key:String!, $designateDetails:String!, $designateSuperior:String!,
    $jobDescription:String!,
    $coverageModel:String!,
    $ic4proRecordDate:Date!,
    $ic4proRecordTime:Time!,
    $ic4proOperator:String!,
    $ic4proOperation:String!,
    $ic4proWorkstation:String!,
    $ic4proRecordCounter:Int!,
  	$dashboardurl: String!,
  	$ic4proLanguage: String!,
    
) {
  createDesignate(key:$key, designateDetails: $designateDetails, designateSuperior:$designateSuperior,
    jobDescription:$jobDescription, coverageModel:$coverageModel,dashboardurl:$dashboardurl,
  	ic4proLanguage: $ic4proLanguage,
    ic4proRecordDate: $ic4proRecordDate, ic4proRecordTime: $ic4proRecordTime,
    ic4proOperator: $ic4proOperator, ic4proOperation: $ic4proOperation, ic4proWorkstation: $ic4proWorkstation,
    ic4proRecordCounter: $ic4proRecordCounter){
      key

    }
}
`;




export const CREATE_DESIGNATEDEL = gql`
mutation createDesignatedel( $key:String!, $designateDetails:String!,$designateSuperior:String!,
    $jobDescription:String!,
    $coverageArea:String!,
    $ic4proRecordDate:String!,
    $ic4proRecordTime:String!,
    $ic4proOperator:String!,
    $ic4proOperation:String!,
    $ic4proWorkstation:String!,
    $ic4proRecordCounter:String!
    
) {
  createDesignatedel(key:$key, designateDetails: $designateDetails, coverageva:$coverageva,designateSuperior:$designateSuperior,
    jobDescription:$jobDescription,
    ic4proRecordDate: $ic4proRecordDate, ic4proRecordTime: $ic4proRecordTime,
    ic4proOperator: $ic4proOperator, ic4proOperation: $ic4proOperation, ic4proWorkstation: $ic4proWorkstation,
    ic4proRecordCounter: $ic4proRecordCounter){
      key

    }
}
`;


export const UPDATE_DESIGNATE = gql` 
mutation updateDesignate( $key:String!, $designateDetails:String!, $designateSuperior:String!,
    $jobDescription:String!,
    $coverageModel:String!,
    $ic4proRecordDate:Date!,
    $ic4proRecordTime:Time!,
    $ic4proOperator:String!,
    $ic4proOperation:String!,
    $ic4proWorkstation:String!,
    $ic4proRecordCounter:Int!,
  	$dashboardurl: String!,
  	$ic4proLanguage: String!,
    ){
    updateDesignate(key:$key, designateDetails: $designateDetails, designateSuperior:$designateSuperior,
    jobDescription:$jobDescription, coverageModel:$coverageModel,dashboardurl:$dashboardurl,
  	ic4proLanguage: $ic4proLanguage,
    ic4proRecordDate: $ic4proRecordDate, ic4proRecordTime: $ic4proRecordTime,
    ic4proOperator: $ic4proOperator, ic4proOperation: $ic4proOperation, ic4proWorkstation: $ic4proWorkstation,
    ic4proRecordCounter: $ic4proRecordCounter){
    designate{
      key
    }
  }
}`;







export const DELETE_DESIGNATE = gql`
mutation deleteDesignate($key:String!){
  deleteDesignate(key:$key){
    designate{
      designateDetails
    }
  }
}`;






export const CREATE_URLTYPESDEL = gql`
mutation createUrltypesclone($key: String!,
  $description: String!,
  $ic4proLanguage: String!,
  $recordDate: String!,
  $recordTime: String!,
  $operator: String!,
  $operation: String!,
  $workstation: String!,
  $recordCounter: String!) {
  createUrltypesclone(key: $key, description: $description, ic4proLanguage: $ic4proLanguage, recordDate: $recordDate, recordTime: $recordTime,
    operator: $operator, operation: $operation, workstation: $workstation,
    recordCounter: $recordCounter){
    key

  }
}
`;


export const CREATE_URL = gql`
mutation createUrl(
  $key:String!, $urltype:String!, $ic4proLanguage:String!,
    $urldescription:String!,
    $recordDate:String!, $recordTime:String!,
    $operator:String!, $operation:String!, $workstation:String!,
    $recordCounter:String!
) {
  createUrl(key:$key, urltype: $urltype, ic4proLanguage:$ic4proLanguage,
    urldescription:$urldescription,
    recordDate: $recordDate, recordTime: $recordTime,
    operator: $operator, operation: $operation, workstation: $workstation,
    recordCounter: $recordCounter){
      key

    }
}
`;


export const UPDATE_URL = gql`
mutation updateUrl($key:String!,
    $urltype: String!,
  $urldescription:String!,
    $ic4proLanguage: String!,
    $recordDate: String!,
    $recordTime: String!,
    $operator: String!,
    $operation: String!,
    $workstation: String!,
    $recordCounter:String!) {
  updateUrl(key:$key, urltype: $urltype, ic4proLanguage:$ic4proLanguage,
    urldescription:$urldescription,
    recordDate: $recordDate, recordTime: $recordTime,
    operator: $operator, operation: $operation, workstation: $workstation,
    recordCounter: $recordCounter){
      url{
       key 
      }

    }
}
`


export const DELETE_URL = gql`
mutation deleteUrl($key:String!){
  deleteUrl(key:$key){
    url{
      urldescription
    }
  }
}`;















  // otpafterthirdAttempt, otpNonWorking, otpPasswordReset, otpInactive, otpDeviceChange,otpfirstlogin, deviceloginrestrict

// export const CREATE_SPF = gql`
// mutation createSpf($key:String!, $urlprefix:String!,
//   $otpafterthirdAttempt:String!, $otpNonWorking:String!, 
//   $otpPasswordReset:String!, $otpInactive:String!, $otpDeviceChange:String!,
//   $otpfirstlogin:String!, $deviceloginrestrict:String!,  $accessDate:String!, $appendDomain:String!, $ic4proLanguage:String!,
//   $appsName:String!,$client:String!,$domainName:String!, $expiryDate:String!, 
//   $ldapStatus:String!, $ldapUrl:String!, $licenceCode:String!, $mailAddress:String!, 
//   $mailPassword:String!, $mailPort:String!, $mailServer:String!, $mailUser:String, 
//   $mode:String!,$otcTime:Int!,$release:String!, $users:Int!, 
//   $operation:String!,$operator:String, $recordCounter:Int!, $recordDate:String!, 
//   $recordTime:String!, $workstation:String!){
//   createSpf(key:$key, urlprefix:$urlprefix,
//     otpafterthirdAttempt:$otpafterthirdAttempt, otpNonWorking:$otpNonWorking, 
//   otpPasswordReset:$otpPasswordReset, otpInactive:$otpInactive, otpDeviceChange:$otpDeviceChange,
//   otpfirstlogin:$otpfirstlogin, deviceloginrestrict:$deviceloginrestrict,
//     accessDate:$accessDate, appendDomain: $appendDomain, appsName:$appsName,ic4proLanguage:$ic4proLanguage,
//     client:$client,domainName:$domainName, expiryDate:$expiryDate, ldapStatus:$ldapStatus,
//     ldapUrl:$ldapUrl, licenceCode:$licenceCode,mailAddress:$mailAddress, mailPassword:$mailPassword,
//     mailPort:$mailPort, mailServer:$mailServer, mailUser:$mailUser, mode:$mode,otcTime:$otcTime,release:$release,
//     users:$users, operation:$operation,operator:$operator,recordCounter:$recordCounter, recordDate:$recordDate, recordTime:$recordTime,
//     workstation:$workstation){
//     key
//   }
// }
// `;


// export const UPDATE_SPF = gql`
// mutation updateSpf($key:String!,$urlprefix:String!, $accessDate:String!, $appendDomain:String!, $ic4proLanguage:String!,
//   $appsName:String!,$client:String!,$domainName:String!, $expiryDate:String!, $otpafterthirdAttempt:String!, $otpNonWorking:String!, 
//   $otpPasswordReset:String!, $otpInactive:String!, $otpDeviceChange:String!,
//   $otpfirstlogin:String!, $deviceloginrestrict:String!,
//   $ldapStatus:String!, $ldapUrl:String!, $licenceCode:String!, $mailAddress:String!, 
//   $mailPassword:String!, $mailPort:String!, $mailServer:String!, $mailUser:String, 
//   $mode:String!,$otcTime:Int!,$release:String!, $users:Int!, 
//   $operation:String!,$operator:String, $recordCounter:Int!, $recordDate:String!, 
//   $recordTime:String!, $workstation:String!){
//   updateSpf(key:$key, accessDate:$accessDate, urlprefix:$urlprefix, appendDomain: $appendDomain, appsName:$appsName,ic4proLanguage:$ic4proLanguage,
//     client:$client,domainName:$domainName, expiryDate:$expiryDate, ldapStatus:$ldapStatus,
//     ldapUrl:$ldapUrl, licenceCode:$licenceCode,mailAddress:$mailAddress, mailPassword:$mailPassword,
//     mailPort:$mailPort, mailServer:$mailServer, mailUser:$mailUser, mode:$mode,otcTime:$otcTime,release:$release,
//     users:$users, otpafterthirdAttempt:$otpafterthirdAttempt, otpNonWorking:$otpNonWorking, 
//   otpPasswordReset:$otpPasswordReset, otpInactive:$otpInactive, otpDeviceChange:$otpDeviceChange,
//   otpfirstlogin:$otpfirstlogin, deviceloginrestrict:$deviceloginrestrict,
//     operation:$operation,operator:$operator,recordCounter:$recordCounter, recordDate:$recordDate, recordTime:$recordTime,
//     workstation:$workstation){
//       spf{

//         key
//       }
//   }
// }
// `;

// export const DELETE_SPF = gql`
// mutation deleteSpf($key:String!){
//   deleteSpf(key:$key){
//     spf{
//       appsName
//     }
//   }
// }`;