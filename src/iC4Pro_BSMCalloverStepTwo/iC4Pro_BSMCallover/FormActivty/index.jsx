import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Row,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import data from '../Data/ic4pro_countrystate.json';
import coverageData from '../Data/ic4pro_coverages.json';
import designateData from '../Data/ic4pro_designate.json';
import zoneData from '../Data/ic4pro_zone.json';
import usersJson from '../Data/ic4pro_users.json';
import optionData from '../Data/ic4pro_cluster.json';
import statusData from '../Data/ic4pro_status.json';
import conditionData from '../Data/ic4pro_conditions.json';
import OperActDetails from './OperActDetails'
import { useScrollTrigger } from '@material-ui/core';


const FormContainer = ({
  show,
  mode,
  handleForm,
  submitForm,
  selectedData,
  deleteData
}) => {


//   const [country, setCountry] = useState(null);
//   const [lang, setLang] = useState(null);
//  const [langList, setLangList] = useState([]);
//   const [local, setLocal] = useState(null);
//   const [localList, setLocalList] = useState([]);
  // const [ users, setUsers ] = useState([...usersJson])
  



  // handle change event of the country dropdown
  // const handleCountryChange = (e) => {
  //   setCountry(e);
  //   setLangList(e.states);
  //   console.log("Country Selected is:", e.name)
    //localStorage.setItem("branch_country", e.name)
    //setLang(null);

  //};

  // handle change event of the language dropdown
  // const handleLanguageChange = (e) => {
  //   setLang(e);
  //   setLocalList(e.lgas);
  //   console.log("State Selected:", e.name)
    //localStorage.setItem("branch_state", e.name)
    //setLocal(null);
  //  };

  // const handleLocalityChange = (e) => {
  //   setLocal(e);
  //   console.log("Local government  Selected:", e.name)
    //localStorage.setItem("branch_county", e.name)
  //};

  const { reset, ...methods } = useForm();

  useEffect(() => {
    if (selectedData && (mode !== 'create')) {
      console.log(selectedData);
      
      reset({
        userActivityId: selectedData.userActivityId, 
        ic4proApplication: selectedData.ic4proApplication,
        ic4proRecordId: selectedData.ic4proRecordId,
        ic4proFunction: selectedData.ic4proFunction,
        // conditions: selectedData.conditions.map(cs => ({
        //   specialCondition: conditionData.find(cd => cd.conditionId === cs.specialCondition),
        // })),
        // notifierStatus: statusData.find(rd => rd.statusID === selectedData.notifierStatus),
        // notifierId: usersJson.find(rd => rd.userid === selectedData.notifierId),
        ic4proChangeDetails: selectedData.ic4proChangeDetails.map(on => ({
          ic4proFieldName: on.ic4proFieldName,
          ic4proChangeFrom: on.ic4proChangeFrom,
          ic4proChangeTo: on.ic4proChangeTo
        })),
        ic4proLanguage: selectedData.ic4proLanguage,
        // ic4proCurrentCounter: parseInt(selectedData.ic4proCurrentCounter),
        ic4proCurrentCounter: selectedData.ic4proCurrentCounter,
        ic4proOperator: selectedData.ic4proOperator,
        ic4proRecordDate: selectedData.ic4proRecordDate,
        ic4proRecordTime: selectedData.ic4proRecordTime,
        ic4proPreviousCounter: selectedData.ic4proPreviousCounter,
        ic4proWorkstation: selectedData.ic4proWorkstation,
        ic4proPreviousStatus: selectedData.ic4proPreviousStatus,
        ic4proPresentStatus: selectedData.ic4proPresentStatus,
        ic4proRelatedId: selectedData.ic4proRelatedId,
        ic4proRelatedApp: selectedData.ic4proRelatedApp,
        ic4proRelatedAppType: selectedData.ic4proRelatedAppType,
      })

    } else {
      reset({
        notifierid: '', 
        modelid: '',
        description: '',
        ic4prolanguage: '',
        conditions: [{}],
        notifierStatus: '',
        notifierId: '',
        otherNotifiers: [{}],
        specialMessage: '',
        recordCounter: 0,
      })
    }

  }, [mode, reset, selectedData])

  const onSubmit = data => {
    const newData = {
      ...data,
      notifierid: data.notifierid, 
      modelid: data.modelid,
      description: data.description,
      ic4prolanguage: data.ic4prolanguage,
      conditions: data.conditions.map(cs => ({
        ...cs,
        specialCondition: cs.specialCondition.conditionId,
      })), 
      notifierStatus: data.notifierStatus.statusID,
      notifierId: data.notifierId.userid,
      otherNotifiers: data.otherNotifiers.map(on => ({
        ...on,
        otherNotifier: on.otherNotifier.userid,
        otherCondition: on.otherCondition.conditionId,
        otherStatus: on.otherStatus.statusID
      })),
      specialMessage: data.specialMessage,
      // keyOfficers: data.keyOfficers.map(ko => ({
      //   ...ko,
      //   staffName: ko.staffName.userid
      // })),
      // keyOfficers: data.accessedBy.map(sob => ({
      //   ...sob,
      //   // designate: sob.designate.description,
      //   officerId: sob.officers.map(sof => ({ officename: sof.userid}))
      // })),
      recordDate: moment().format('YYYYMMDD'),
      recordTime: moment().format('HHmmss'),
      recordCounter: mode === 'create' ? 1 : mode === 'edit' && parseInt(data.recordCounter) + 1,
    }
    // setCountry(null);
    // setLang(null);
    // setLocal(null);
    // setLocalList(null);
    // setLangList(null);
    console.log("NewData:", newData)
    console.log("Mode:", mode)
    submitForm(newData, mode)
    console.log(newData);
    console.log(submitForm(newData, mode));
    // localStorage.removeItem("branch_country")
    // localStorage.removeItem("State")
    // localStorage.removeItem("branch_county")
    reset();
  }

  return (
    <Modal
      show={show}
      onHide={handleForm}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
      size="xl"
    >

      <FormProvider
      
        {...methods}
        reset={reset}
        selectedData={selectedData}
        mode={mode}
        // location={{
        //   handleLocalityChange, handleLanguageChange, handleCountryChange, localList, local, langList, lang, country,
        // }}
        datas={{
          data,
          optionData,
          coverageData,
          zoneData,
          usersJson,
          designateData,
          statusData,
          conditionData,
        }}
      >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal.Header closeButton={false} style={{backgroundColor:"#2196F3", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", padding: '2px'}}>
              View Operations Activity </Modal.Title>
            <Row>
              {/* {
                mode === 'delete'
                  ? (
                    <div>
                      <Button
                        variant="info"
                        className="border border-white"
                        size="sm"
                        onClick={deleteData}
                        type="button"
                        style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
                      >
                        Delete
                </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        type="submit"
                        variant="info"
                        className="border border-white"
                        size="sm"
                        disabled={mode === 'view'}
                        style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
                      >
                        Save
                  </Button>
                    </div>
                  )
              } */}
              {/* <div>
                <Button
                  variant="info"
                  size="sm"
                  className="border border-white "
                  style={{ maxWidth: '4rem',  border: '0', borderRadius: '2rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
                >
                  Next
              </Button>
              </div> */}

              <div>
                <Button
                  variant="success"
                  size="sm"
                  className="border border-white ml-1"
                  onClick={handleForm}
                  style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6rem', marginTop: '3px' }}
                >
                  Close
              </Button>
              </div>
              {/* <div style={{ marginRight: '1.4rem', marginBottom: '20px' }}>
                <Button variant="danger" className="border border-white ml-1" size="sm" style={{ maxWidth: '4rem', maxHeight: '2rem', marginTop: '3px' }}>Help</Button>
              </div> */}
            </Row>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F2F2F2', padding:'0' }}>
            <OperActDetails />
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
