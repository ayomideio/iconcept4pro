import React, { useEffect} from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Row,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import CurrencyHisDetails from './currencyHistoryDetails';



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
        ic4proCurrencyCode: selectedData.ic4proCurrencyCode,
        ic4proCurrencyName: selectedData.ic4proCurrencyName,
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
        ic4proCurrencyCode:'',
        ic4proCurrencyName:'',
        ic4proRank: '',
        ic4proBuyRate: '',
        ic4proSellRate: '',
        ic4proMidRate: '',
        ic4proBuyRateUsdEqv: '',
        ic4proSellRateUsdEqv: '',
        ic4proMidRateUsdEqv: '',
        ic4proRateDate: '',
        ic4proRateTime: '',
        ic4proLiborRate: '',
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
              View Currency History </Modal.Title>
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
            <CurrencyHisDetails />
          </Modal.Body>
        </Form>
      </FormProvider>
      </Modal>
     
  )
}

export default FormContainer;
