import React, { useEffect} from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Row,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import CountryHisDetails from './countryHistoryDetails';



const FormContainer = ({
  show,
  mode,
  handleForm,
  submitForm,
  selectedData,
}) => {



  const { reset, ...methods } = useForm();

  useEffect(() => {
    if (selectedData && (mode !== 'create')) {
      reset({
        ic4proHistoryId: selectedData.ic4proHistoryId,
        ic4proCountryCode: selectedData.ic4proCountryCode,
        ic4proCountryName: selectedData.ic4proCountryName,
        ic4proCurrencyCode: selectedData.ic4proCurrencyCode,
        ic4proPhoneCode: selectedData.ic4proPhoneCode,
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
        ic4proHistoryId: '',
        ic4proCountryCode: '',
        ic4proLanugageName: '',
        ic4proLanuageNativeName: '',
        ic4proPhoneCode: '',
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
      ic4proCountryCode: data.ic4proCountryCode,
      ic4proLanugageName: data.ic4proCountryName,
      ic4proLanuageNativeName: data.ic4proLanuageNativeName,
      ic4proPhoneCode: data.ic4proPhoneCode,
        ic4proLanguage: data.ic4proLanguage,
        ic4proModifier: data.ic4proModifier,            
        ic4proDateModified: data.ic4proDateModified,       
        ic4proTimeModified: data.ic4proTimeModified,        
        ic4proModifierTerminal: data.ic4proModifierTerminal, 
    
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
        
        datas={{
        }}
      >

        <Form onSubmit={methods.handleSubmit(onSubmit)}>
       

        <Modal.Header closeButton={false} style={{backgroundColor:"#2196F3", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", padding: '2px'}}>
              View Country History </Modal.Title>
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
            <CountryHisDetails />
          </Modal.Body>
        </Form>
      </FormProvider>
      </Modal>
     
  )
}

export default FormContainer;
