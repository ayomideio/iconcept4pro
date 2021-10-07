import React, { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Row,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import OpeHisDetails from './operationHistoryDetails';


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
        ic4proOperationID: selectedData.ic4proOperationID,
        ic4proModelId: selectedData.ic4proModelId,
        ic4proFunction: selectedData.ic4proFunction,
        ic4proDescription: selectedData.ic4proDescription,
        ic4proFunctionColor: selectedData.ic4proFunctionColor,
        ic4proSendOTP: selectedData.ic4proSendOTP , 
	      ic4proOtpMessage: selectedData.ic4proOtpMessage,
        ic4proLanguage: selectedData.ic4proLanguage,
        ic4proModifier: selectedData.ic4proModifier,            
        ic4proDateModified: selectedData.ic4proDateModified,       
        ic4proTimeModified: selectedData.ic4proTimeModified,        
        ic4proModifierTerminal: selectedData.ic4proModifierTerminal,
        ic4proWorkstation: selectedData.ic4proWorkstation, 
      

        ic4proRecordCounter: parseInt(selectedData.ic4proRecordCounter),

      })

    } else {
     
      reset({
        ic4proOperationID: '',
        ic4proModalId: '',
        ic4proFunction: '',
        ic4proDescription: '',
        ic4proFunctionColor: '',
        ic4proSendOTP: '',  
	      ic4proOtpMessage: '',
        ic4proLanguage: '',
        ic4proModifier: '',            
        ic4proDateModified: '',       
        ic4proTimeModified: '',        
        ic4proModifierTerminal: '', 
       
        ic4proRecordCounter: 0,
      })
    }

  }, [mode, reset, selectedData])

  const onSubmit = data => {
    const newData = {
      ...data,
        ic4proOperationID: data.ic4proOperationID,
        ic4proModalId: data.ic4proModalId.ic4proModalId,
        ic4proFunction: data.ic4proFunction,
        ic4proDescription: data.ic4proDescription,
        ic4proFunctionColor: data.ic4proFunctionColor.colourId,
        ic4proSendOTP: data.ic4proSendOTP,  
	      ic4proOtpMessage: data.ic4proOtpMessage,
        ic4proLanguage: data.ic4proLanguage,
        ic4proModifier: data.ic4proModifier,            
        ic4proDateModified: data.ic4proDateModified,       
        ic4proTimeModified: data.ic4proTimeModified,        
        ic4proModifierTerminal: data.ic4proModifierTerminal, 
    
      recordDate: moment().format('YYYYMMDD'),
      recordTime: moment().format('HHmmss'),
      ic4proRecordCounter: mode === 'create' ? 1 : mode === 'edit' && parseInt(data.ic4proRecordCounter) + 1,
    }
    
    console.log("NewData:", newData)
    console.log("Mode:", mode)
    submitForm(newData, mode)
    console.log(newData);
    console.log(submitForm(newData, mode));
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
        
        datas={{
        }}
      >

        <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal.Header closeButton={false} style={{backgroundColor:"#2196F3", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", padding: '2px'}}>
              View Operations History </Modal.Title>
            <Row>
              
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
             
            </Row>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F2F2F2', padding:'0' }}>
            <OpeHisDetails />
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
