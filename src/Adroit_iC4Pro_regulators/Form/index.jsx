import React, { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import RegulatorDetails from './RegulatorDetails';



const FormContainer = ({
  show,
  mode,
  handleForm,
  submitForm,
  selectedData,
  deleteData
}) => {

 
  const { reset, ...methods } = useForm();

  useEffect(() => {
    if (selectedData && (mode !== 'create')) {
      console.log(selectedData);
     
      reset({
        ic4proRegulatorCode: selectedData.ic4proRegulatorCode,
        ic4proRegulatorName:selectedData.ic4proRegulatorName,
        ic4proYearOfEstablish: selectedData.ic4proYearOfEstablish,
        ic4proCountryDomicile: selectedData.ic4proCountryDomicile,
        ic4proUrl: selectedData.ic4proUrl,
        ic4proMission: selectedData.ic4proMission,
        ic4proObjective: selectedData.ic4proObjective,
        ic4proLanguage: selectedData.ic4proLanguage,
        ic4proRecordCounter: parseInt(selectedData.ic4proRecordCounter),

      })

    } else {
     
      reset({
        ic4proRegulatorCode:'',
        ic4proRegulatorName: '',
        ic4proYearOfEstablish: '',
        ic4proCountryDomicile: '',
        ic4proUrl: '',
        ic4proMission: '',
        ic4proObjective: '',
        ic4proLanguage: '',
       
        ic4proRecordCounter: 0,
      })
    }

  }, [mode, reset, selectedData])

  const onSubmit = data => {
    const newData = {
      ...data,
      ic4proRegulatorCode: data.ic4proRegulatorCode,
      ic4proRegulatorName: data.ic4proRegulatorName,
      ic4proYearOfEstablish: data.ic4proYearOfEstablish,
      ic4proCountryDomicile: data.ic4proCountryDomicile,
      ic4proUrl: data.ic4proUrl,
      ic4proMission: data.ic4proMission,
      ic4proObjective: data.ic4proObjective,
        ic4proLanguage: data.ic4proLanguage,
      ic4proRecordDate: moment().format('YYYYMMDD'),
      ic4proRecordTime: moment().format('HHmmss'),
      ic4proRecordCounter: mode === 'create' ? 1 : mode === 'edit' && parseInt(data.ic4proRecordCounter) + 1,
    }
   
    submitForm(newData, mode)
  
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
        
      >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal.Header style={{ backgroundColor: '#8C00FF', padding: '0', height: '45px' }}>
            <Modal.Title className="text-capitalize" style={{ marginRight: '6px' }}> <h5 style={{ marginTop: '5px' }}>{mode} Regulator Details </h5></Modal.Title>
            <Col md="8" ></Col>
            
            <Col>
              
              {
                mode === 'delete'
                  ? (
                    
                      <Button
                        variant="info"
                        className="border border-white"
                        size="sm"
                        onClick={deleteData}
                        type="button"
                        style={{ maxWidth: '3rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px', }}
                      >
                        Delete
                </Button>
                    
                  ) : (
                    
                      <Button
                        type="submit"
                        variant="info"
                        className="border border-white"
                        size="sm"
                        disabled={mode === 'view'}
                        style={{ maxWidth: '3rem', maxHeight: '2rem', marginRight: '2px', marginTop: '3px' }}
                      >
                        Save
                  </Button>
                    
                  )
              }
              
                <Button
                  variant="success"
                  size="sm"
                  className="border border-white ml-1"
                  onClick={handleForm}
                  style={{ maxWidth: '3rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
                >
                  Cancel
              </Button>
              
                <Button variant="danger" className="border border-white ml-1" size="sm" style={{ maxWidth: '3rem', maxHeight: '2rem', marginTop: '3px' }}>Help</Button>
             
            </Col>
         
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F2F2F2', padding:'0' }}>
            <RegulatorDetails/>
          </Modal.Body>
        </Form>
      </FormProvider>
      </Modal>
  )
}

export default FormContainer;
