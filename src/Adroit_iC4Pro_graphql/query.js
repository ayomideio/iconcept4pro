import gql from "graphql-tag";

export const EXCEPTION_DETAILS = gql`
  query ExceptionDetails($page: Int, $rows: Int, $query: String) {
    allGrid(page: $page, rows: $rows, query: $query) {
      data {
        EXCEPTIONCode
        EXCEPTIONName
        IC4SeverityId {
          SEVLevel
          SEVIndicator
          OWNER {
            PROCESSEntityId
          }
          RESPONDENT {
            PROCESSEntityId
          }
          CREATEDBy
          DATECreated
          MODIFIEDBy
          DATEModified
        }
        PRIORITY
        RUNTimeMode
        RUNTimeInfo
        RUNTime
        LASTRunDate
        NEXTRunTime
        REVIEW
        EXCEPTION
        MESSAGE
        IMPLICATION
        ACTION
        REQUESTOR
        EXCEPTIONCreator
        DATECreated
        CREATEDBy
        MODIFIEDBy
        MODIFIEDDate
      }
      page
      rows
      rowCount
      pages
    }
  }
`;
export const EXCEPTION_DETAIL = gql`
  query ExceptionDetail($EXCEPTIONCode: String!) {
    grid(EXCEPTIONCode: $EXCEPTIONCode) {
      EXCEPTIONCode
      EXCEPTIONName
      IC4SeverityId {
        SEVLevel
        SEVIndicator
        OWNER {
          PROCESSEntityId
        }
        RESPONDENT {
          PROCESSEntityId
        }
        CREATEDBy
        DATECreated
        MODIFIEDBy
        DATEModified
      }
      PRIORITY
      RUNTimeMode
      RUNTimeInfo
      RUNTime
      LASTRunDate
      NEXTRunTime
      REVIEW
      EXCEPTION
      MESSAGE
      IMPLICATION
      ACTION
      REQUESTOR
      EXCEPTIONCreator
      DATECreated
      CREATEDBy
      MODIFIEDBy
      MODIFIEDDate
    }
  }
`;
export const ALL_PROCESS_ENTITY = gql`
  query AllProcessEntity($page: Int, $rows: Int) {
    allProcessEntity(page: $page, rows: $rows) {
      data {
        PROCESSEntityId
        SHORTDescription
        FULLDescription
        SUPERIOREntityId
        JOBDescription
        ENTITYLevel
        CREATEDBy
        DATECreated
        MODIFIEDBy
        DATEModified
      }
      page
      rows
      rowCount
      pages
    }
  }
`;


export const PROCESS_ENTITY = gql`
  query ProcessEntity($PROCESSEntityId: String!) {
    processEntity(PROCESSEntityId: $PROCESSEntityId) {
      PROCESSEntityId
      SHORTDescription
      FULLDescription
      SUPERIOREntityId
      JOBDescription
      ENTITYLevel
      CREATEDBy
      DATECreated
      MODIFIEDBy
      DATEModified
    }
  }
`;
export const ALL_SEVERITY = gql`
  query AllSeverity($page: Int, $rows: Int) {
    allSeverity(page: $page, rows: $rows) {
      data {
        SEVLevel
        SEVIndicator
        OWNER {
          PROCESSEntityId
        }
        RESPONDENT {
          PROCESSEntityId
        }
        CREATEDBy
        DATECreated
        MODIFIEDBy
        DATEModified
      }
      page
      rows
    }
  }
`;
export const SEVERITY = gql`
  query Severity($SEVLevel: String!) {
    severity(SEVLevel: $SEVLevel) {
      SEVLevel
      SEVIndicator
      OWNER {
        PROCESSEntityId
      }
      RESPONDENT {
        PROCESSEntityId
      }
      CREATEDBy
      DATECreated
      MODIFIEDBy
      DATEModified
    }
  }
`;
export const IS_LOGGED_IN_QUERY =  gql`
query{
  isLoggedIn @client
}
`;


export const STR_MANUAL = gql`
query StrManual($page: Int, $rows: Int) {
  allStrmanualEntity(page: $page, rows: $rows) {
    data {
     EVENTId
      EVENTDescription
      REASON
      TRANSRef
      COMMENT
      INDICATORId
      FLAGGEDBy
      DATECreated
      REVIEWED
    }
    page
    rows
    rowCount
    pages
  }
}
`;



export const QUERY_PRODUCTS = gql`
query products{
  products{
    key
    label
    ic4proLanguage
    items
    dateActivated
    dateExpired
    licenseCode
    status
    ic4proRecordDate
    ic4proRecordTime
    ic4proRecordCounter
    ic4proOperator
    ic4proOperation
    ic4proWorkstation
    accessedby
  }
}`;
export const QUERY_PRODUCTSLANGUAGE=gql`

query{
  productlanguages{
    language
  }
}
    `;
    export const QUERY_COMPONENTSLANGUAGE=gql`

query{
  componentlanguages{
    language
  }
}
    `;
    export const QUERY_MODULESLANGUAGE=gql`

    query{
      modulelanguages{
        language
      }
    }
        `;

    
export const QUERY_COMPONENT = gql`
query components{
  components{
    key
    parentKey
    label
    ic4proLanguage
    status
    ic4proRecordDate
    ic4proRecordTime
    ic4proRecordCounter
    ic4proOperator
    ic4proOperation
    ic4proWorkstation
    accessedby
    url
    icon
  }
}`;
export const QUERY_USERGROUPS = gql`
query usergroupss{
  usergroups{
    groupId
    groupName
    groupDescription
    ic4proRecordDate
    ic4proRecordTime
    ic4proRecordCounter
    ic4proOperator
    ic4proOperation
    ic4proWorkstation

   
  }
}`;
export const QUERY_MODULES = gql`
query modules{
  modules{
    key
    parentKey
    label
    ic4proLanguage
    icon
    items
    status
    ic4proRecordDate
    ic4proRecordTime
    ic4proRecordCounter
    ic4proOperator
    ic4proOperation
    ic4proWorkstation
    accessedby
  }
}

`;
export const GET_LANGUAGE=gql`
{
	installedlanguage{
    language
    key
	  }
}
`;
export const QUERY_ALL_PRODUCTS= gql`
query {
  products{
    key
    label
    ic4proLanguage
    items
    dateActivated
    dateExpired
    licenseCode
    status
    ic4proRecordDate
    ic4proRecordTime
    ic4proRecordCounter
    ic4proOperator
    ic4proOperation
    ic4proWorkstation
    accessedby
  }
  modules{
    key
    parentKey
    label
    ic4proLanguage
    icon
    items
    status
    ic4proRecordDate
    ic4proRecordTime
    ic4proRecordCounter
    ic4proOperator
    ic4proOperation
    ic4proWorkstation
    accessedby
  }
  components{
    key
    parentKey
    label
   ic4proLanguage
    status
    ic4proRecordDate
    ic4proRecordTime
    ic4proRecordCounter
    ic4proOperator
    ic4proOperation
    ic4proWorkstation
    accessedby
    url
    icon
  }
  installedlanguage{
    key
    language
    ic4proRecordDate
    ic4proRecordTime
    ic4proOperator
    ic4proOperation
    ic4proWorkstation
    ic4proRecordCounter
  }

}`
;




export const QUERY_DESIGNATE = gql`

query{
  designate{
   key,
    designateDetails,
    designateSuperior,
    dashboardurl{
      key
      description
    }
    jobDescription,
    coverageModel{
      key
      description
    },
    ic4proLanguage{
      key,
      language
    }
    ic4proRecordDate,
    ic4proRecordTime,
    ic4proOperator,
    ic4proOperation,
    ic4proWorkstation,
    ic4proRecordCounter
  
  }
}
`;



export const QUERY_ERROR = gql`
query{
  errorr{
   key
  }
}
`



export const QUERY_URL = gql`
query{
  url{
    key,
    urltype,
    ic4proLanguage{
      language,
      key
    }
    urldescription,
    recordDate,
    recordTime,
    operator,
    operation,
    workstation,
    recordCounter,
  }
}
`;



export const QUERY_USERACTIVITY = gql`
{
  useractivity{
    userActivityId
    ic4proApplication
    ic4proFunction
    ic4proChangeDetails
    ic4proLanguage
    ic4proRecordId
    ic4proRecordDate
    ic4proRecordTime
    ic4proOperator
    ic4proWorkstation
    ic4proPreviousCounter
    ic4proCurrentCounter
    ic4proPreviousStatus
    ic4proPresentStatus
    ic4proRelatedId
    ic4proRelatedApp
    ic4proRelatedAppType
  }
}
`



export const QUERY_SPF = gql`
{
  spf{
   
    ic4proLanguage{
      key
      language
    }
    
  }
  
}
`;
