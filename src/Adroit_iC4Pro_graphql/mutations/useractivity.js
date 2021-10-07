import gql from "graphql-tag";

export const CREATE_USERACTIVITY=gql`
  mutation createUseractivity($id:String!,$ic4proApplication:String!,$ic4proChangeDetails:String!,$ic4proLanguage:String!,
    $ic4proCurrentCounter:String!,
    $ic4proPreviousCounter:String!, $ic4proFunction:String!,$ic4proOperator:String!,$ic4proRecordDate:String!,$ic4proRecordTime:String!,
    $ic4proRecordId:String!,$ic4proWorkstation:String!){
      createUseractivity(id:$id,ic4proApplication:$ic4proApplication,ic4proLanguage:$ic4proLanguage,
        ic4proChangeDetails:$ic4proChangeDetails,
        ic4proCurrentCounter:$ic4proCurrentCounter,ic4proPreviousCounter:$ic4proPreviousCounter,
        ic4proFunction:$ic4proFunction,ic4proOperator:$ic4proOperator,ic4proRecordDate:$ic4proRecordDate,
        ic4proRecordTime:$ic4proRecordTime,ic4proRecordId:$ic4proRecordId,ic4proWorkstation:$ic4proWorkstation){
        id
    }
  }`
  ;