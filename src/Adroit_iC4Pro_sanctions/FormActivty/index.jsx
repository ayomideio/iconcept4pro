import React, { useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Row,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import SanctionActivityDetails from './sanctionActivityDetails';


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
      console.log(selectedData);

      reset({
        userActivityId: selectedData.userActivityId,
        ic4proApplication: selectedData.ic4proApplication,
        ic4proRecordId: selectedData.ic4proRecordId,
        ic4proFunction: selectedData.ic4proFunction,

        ic4proChangeDetails: selectedData.ic4proChangeDetails.map(on => ({
          ic4proFieldName: on.ic4proFieldName,
          ic4proChangeFrom: on.ic4proChangeFrom,
          ic4proChangeTo: on.ic4proChangeTo
        })),
        ic4proLanguage: selectedData.ic4proLanguage,
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
      recordDate: moment().format('YYYYMMDD'),
      recordTime: moment().format('HHmmss'),
      recordCounter: mode === 'create' ? 1 : mode === 'edit' && parseInt(data.recordCounter) + 1,
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
          <Modal.Header closeButton={false} style={{ backgroundColor: "#2196F3", padding: "0 0", color: '#EEF8F0' }}>
            <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", padding: '2px' }}>
              View Language Activity </Modal.Title>
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
          <Modal.Body style={{ backgroundColor: '#F2F2F2', padding: '0' }}>
            <SanctionActivityDetails />
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
