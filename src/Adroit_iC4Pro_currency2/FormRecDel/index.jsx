import React, { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Row,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import CurrencyDelDetails from './currencyDeleteDetails';


const FormContainer = ({
  show,
  mode,
  handleForm,
  submitForm,
  selectedData
}) => {


  const { reset, ...methods } = useForm();

  useEffect(() => {
    if (selectedData && (mode !== 'create')) {
      console.log(selectedData);
     
      reset({
        ic4proLanguageId: selectedData.ic4proLanguageId,
        ic4proLanguageName: selectedData.ic4proLanguageName,
        ic4proLanguageNativeName: selectedData.ic4proLanguageNativeName,
        ic4proInstalledDate: selectedData.ic4proInstalledDate,
        ic4proLanguage: selectedData.ic4proLanguage,
        ic4proOtpMessage: selectedData.ic4proOtpMessage,

       

        ic4proRecordCounter: parseInt(selectedData.ic4proRecordCounter),

      })

    } else {
      reset({
        ic4proOperationID: '',
        ic4proModalId: '',
        ic4proFunction: '',
        ic4proDescription: '',
        ic4proFunctionColor: '',
        ic4proLanguage: '',
       
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
        ic4proLanguage: selectedData.ic4proLanguage,
      
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
        
      
      >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal.Header closeButton={false} style={{backgroundColor:"#2196F3", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", padding: '2px'}}>
              View Currency Deleted Records </Modal.Title>
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
            <CurrencyDelDetails />
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
