import React, { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import CurrencyDetails from './CurrencyDetails';


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
    
      reset({
        ic4proCurrencyCode: selectedData.ic4proCurrencyCode,
        ic4proCurrencyName:selectedData.ic4proCurrencyName,
        ic4proRank: selectedData.ic4proRank,
        ic4proBuyRate: selectedData.ic4proBuyRate,
        ic4proSellRate: selectedData.ic4proSellRate,
        ic4proMidRate: selectedData.ic4proMidRate,
        ic4proBuyRateUsdEqv: selectedData.ic4proBuyRateUsdEqv,
        ic4proSellRateUsdEqv: selectedData.ic4proSellRateUsdEqv,
        ic4proMidRateUsdEqv: selectedData.ic4proMidRateUsdEqv,
        ic4proRateDate: selectedData.ic4proRateDate,
        ic4proRateTime: selectedData.ic4proRateTime,
        ic4proLiborRate: selectedData.ic4proLiborRate,
        ic4proLanguage: selectedData.ic4proLanguage,
        ic4proRecordCounter: parseInt(selectedData.ic4proRecordCounter),

      })

    
    }    
    else {
     
      reset({
        ic4proCurrencyCode:'',
        ic4proCurrencyName: '',
        ic4proLanguage: '',
       
        ic4proRecordCounter: 0,
      })
    }

  }, [mode, reset, selectedData])

  const onSubmit = data => {
    const newData = {
      ...data,
      ic4proCurrencyCode: data.ic4proCurrencyCode,
      ic4proCurrencyName: data.ic4proCurrencyName,
      ic4proRank: data.ic4proRank,
      ic4proBuyRate: data.ic4proBuyRate,
      ic4proSellRate: data.ic4proSellRate,
      ic4proMidRate: data.ic4proMidRate,
      ic4proBuyRateUsdEqv: data.ic4proBuyRateUsdEqv,
      ic4proSellRateUsdEqv: data.ic4proSellRateUsdEqv,
      ic4proMidRateUsdEqv: data.ic4proMidRateUsdEqv,
      ic4proRateDate: data.ic4proRateDate,
      ic4proRateTime: data.ic4proRateTime,
      ic4proLiborRate: data.ic4proLiborRate,
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
            <Modal.Title className="text-capitalize" style={{ marginRight: '6px' }}> <h5 style={{ marginTop: '5px' }}>{mode} Currency Details </h5></Modal.Title>
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
            <CurrencyDetails/>
          </Modal.Body>
        </Form>
      </FormProvider>
      </Modal>
  )
}

export default FormContainer;
