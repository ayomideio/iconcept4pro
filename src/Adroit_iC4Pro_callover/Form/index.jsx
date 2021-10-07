import React, { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';


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
       
        ic4proRecordCounter: parseInt(selectedData.ic4proRecordCounter),

      })

    } else {
      
      reset({
      
      ic4proLanguage: '',
      ic4proWorkstation: '',
     
      })
    }

  }, [mode, reset, selectedData])

  const onSubmit = data => {
    const newData = {
      ...data,
    
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
        <Modal.Header style={{ backgroundColor: '#8C00FF', padding: '0', height: '45px' }}>
            <Modal.Title className="text-capitalize" style={{ marginRight: '6px' }}>
               <h5 style={{ marginTop: '5px' }}>
                 {mode} FAINT Details</h5></Modal.Title>
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
                        style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px', }}
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
                        style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
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
                style={{
                  maxWidth: '4rem',
                  maxHeight: '2rem',
                  marginRight: '6px',
                  marginTop: '3px'
                }}
                >
                  Cancel
              </Button>
              
              <Button variant="danger" className="border border-white ml-1" size="sm"
                style={{
                  maxWidth: '4rem',
                  maxHeight: '2rem',
                  marginTop: '3px'
                }}>Help</Button>
            
            </Col>
          </Modal.Header>
          <Modal.Body style={{
            backgroundColor: '#F2F2F2',
            padding: '0'
          }}>
          
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
