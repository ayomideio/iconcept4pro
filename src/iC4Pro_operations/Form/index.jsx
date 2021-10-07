import React, { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import usersJson from '../Data/ic4pro_users.json';
import modalData from '../Data/ic4pro_modal.json';
import OperationsDetails from './OperationsDetails';


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
        ic4proModalId:selectedData.ic4proModelId,
        ic4proFunction: selectedData.ic4proFunction,
        ic4proDescription: selectedData.ic4proDescription,
        ic4proFunctionColor: selectedData.ic4proFunctionColor,
        ic4proSendOTP: usersJson.find(scd => scd.otp_code === selectedData.ic4proSendOTP ),
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
        ic4proOtpMessage: '',
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
        ic4proSendOTP: data.ic4proSendOTP.otp_code,
        ic4proLanguage: data.ic4proLanguage,
        ic4proOtpMessage: data.ic4proOtpMessage,
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
          usersJson,
          modalData,
          //statusColorsData
        }}
      >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal.Header style={{ backgroundColor: '#8C00FF', padding: '0', height: '45px' }}>
            <Modal.Title className="text-capitalize" style={{ marginRight: '6px' }}> <h5 style={{ marginTop: '5px' }}>{mode} Operations Details </h5></Modal.Title>
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
              {/* </div> */}
            </Col>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F2F2F2', padding:'0' }}>
            <OperationsDetails/>
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
