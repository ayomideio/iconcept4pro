import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import data from '../Data/ic4pro_countrystate.json';
import coverageData from '../Data/ic4pro_coverages.json';
import concatData from '../Data/ic4pro_concat001.json';
import designateData from '../Data/ic4pro_designate.json';
import departData from '../Data/ic4pro_department.json';
import inspectData from '../Data/ic4pro_inspectionTypes.json';
import zoneData from '../Data/ic4pro_zone.json';
import usersJson from '../Data/ic4pro_users.json';
import optionData from '../Data/ic4pro_cluster.json';
import statusColorsData from '../Data/ic4pro_statusColors.json';
import riskStatusData from '../Data/ic4pro_riskstatus.json';
import modalData from '../Data/ic4pro_modal.json';
import operationData from '../Data/ic4pro_operations.json';
import riskassessData from '../Data/ic4pro_riskassessment.json';
import overdueTimeData from '../Data/ic4pro_overduetime.json';
import FainsDelDetails from './FainsDelDetails';
import { useScrollTrigger } from '@material-ui/core';


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
        ic4proFinId: selectedData.ic4proFinId,
        ic4proReference: selectedData.ic4proReference,
        ic4proLocation: concatData.find(cd => cd.ic4proConcatId === selectedData.ic4proLocation),
        ic4proInspectionType: inspectData.find(id => id.ic4proInspectTypeId === selectedData.ic4proInspectionType),
        ic4proOperation: operationData.find(scd => scd.ic4proFunction === selectedData.ic4proOperation ),
        ic4proAuditDateFrom: moment(selectedData.ic4proAuditDateFrom, 'YYYYMMDD').toDate(),
        ic4proAuditDateTo: moment(selectedData.ic4proAuditDateTo, 'YYYYMMDD').toDate(),
        ic4proVisitDateFrom: moment(selectedData.ic4proVisitDateFrom, 'YYYYMMDD').toDate(),
        ic4proVisitDateTo: moment(selectedData.ic4proVisitDateTo, 'YYYYMMDD').toDate(),
        ic4proExitMeetingDate: moment(selectedData.ic4proExitMeetingDate, 'YYYYMMDD').toDate(),
        ic4proDepartment: departData.find(id => id.ic4proDeptId === selectedData.ic4proDepartment),
        ic4proNotification: selectedData.ic4proNotification,
        ic4proMessage: selectedData.ic4proMessage,
        ic4proContactDesignate: selectedData.ic4proContactDesignate,
        ic4proContactOfficer: usersJson.find(id => id.userid === selectedData.ic4proContactOfficer),
        ic4proOtherReceivers: selectedData.ic4proOtherReceivers.map(or => ({
          ic4proOfficerDesignate: designateData.find(uj => uj.designate_id === or.ic4proOfficerDesignate)
        })),
        ic4proExternalReceivers: usersJson.find(er => er.userid === selectedData.ic4proExternalReceivers),
        ic4proTeamLeader: usersJson.find(er => er.userid === selectedData.ic4proTeamLeader),

        ic4proTeamMembers: selectedData.ic4proTeamMembers.map(or => ({
          ic4proTeamMember: usersJson.find(uj => uj.userid === or.ic4proTeamMember)
        })),

        ic4proAttachments: selectedData.ic4proAttachments,
        ic4proOriginator: selectedData.ic4proOriginator,
        ic4proOriginatorRole: selectedData.ic4proOriginatorRole,
        ic4proNotificationStatus: selectedData.ic4proNotificationStatus,
        ic4proMisId: selectedData.ic4proMisId,
        ic4proMisStatus: selectedData.ic4proMisStatus,
        ic4proRecallReason: selectedData.ic4proRecallReason,
        ic4proRecallMsg: selectedData.ic4proRecallMsg,
        ic4proRecaller: selectedData.ic4proRecaller,
        ic4proRecallerRole: selectedData.ic4proRecallerRole,
        ic4proLanguage: selectedData.ic4proLanguage,
        ic4proRemarkAction: selectedData.ic4proRemarkAction,
        ic4proRecordDeleter: selectedData.ic4proRecordDeleter,            
        ic4proDateDeleted: selectedData.ic4proDateDeleted,       
        ic4proTimeDeleted: selectedData.ic4proTimeDeleted,        
        ic4proTerminal: selectedData.ic4proTerminal,
        ic4proWorkstation: selectedData.ic4proWorkstation,
        
         

        ic4proRecordCounter: parseInt(selectedData.ic4proRecordCounter),

      })

    } else {
      
      reset({
        ic4proFinId: '',
        ic4proReference: '',
        ic4proLocation: '',
        ic4proInspectionType: '',
        ic4proOperation: '',
        ic4proAuditDateFrom: '',
        ic4proAuditDateTo: '',
        ic4proVisitDateFrom: '',
        ic4proVisitDateTo: '',
        ic4proExitMeetingDate: '',
        ic4proDepartment: '',
        ic4proNotification: '',
        ic4proMessage: '',
        ic4proContactDesignate: '',
        ic4proContactOfficer: '',
        ic4proOtherReceivers: [{}],
        ic4proExternalReceivers: '',
        ic4proTeamLeader: '',

        ic4proTeamMembers: [{}],

        ic4proAttachments: '',
        ic4proOriginator: '',
        ic4proOriginatorRole: '',
        ic4proNotificationStatus: '',
        ic4proMisId: '',
        ic4proMisStatus: '',
        ic4proRecallReason: '',
        ic4proRecallMsg: '',
        ic4proRecaller: '',
        ic4proRecallerRole: '',
        ic4proLanguage: '',
        // ic4proRemarkAction: '',
        ic4proWorkstation: '',
        
        ic4proRecordCounter: 0,
      })
    }

  }, [mode, reset, selectedData])

  const onSubmit = data => {
    const newData = {
      ...data,
      ic4proFinId: data.ic4proFinId,
        ic4proReference: data.ic4proReference,
        ic4proLocation: data.ic4proLocation.ic4proConcatId,
        ic4proInspectionType: data.ic4proInspectionType.ic4proInspectTypeId,
        ic4proOperation: data.ic4proOperation.ic4proFunction,
        ic4proAuditDateFrom: moment(data.ic4proAuditDateFrom, 'YYYYMMDD').toDate(),
        ic4proAuditDateTo: moment(data.ic4proAuditDateTo, 'YYYYMMDD').toDate(),
        ic4proVisitDateFrom: moment(data.ic4proVisitDateFrom, 'YYYYMMDD').toDate(),
        ic4proVisitDateTo: moment(data.ic4proVisitDateTo, 'YYYYMMDD').toDate(),
        ic4proExitMeetingDate: moment(data.ic4proExitMeetingDate, 'YYYYMMDD').toDate(),
        ic4proDepartment: data.ic4proDepartment.ic4proDeptId,
        ic4proNotification: data.ic4proNotification,
        ic4proMessage: data.ic4proMessage,
        ic4proContactDesignate: data.ic4proContactDesignate,
        ic4proContactOfficer: data.ic4proContactOfficer.userid,
        ic4proOtherReceivers: data.ic4proOtherReceivers.map(or => ({
          ...or,
          ic4proOfficerDesignate: or.ic4proOfficerDesignate.designate_id
        })),
        ic4proExternalReceivers:  data.ic4proExternalReceivers.userid,
        ic4proTeamLeader:  data.ic4proTeamLeader.userid,

        ic4proTeamMembers: data.ic4proTeamMembers.map(or => ({
          ...or,
          ic4proTeamMember: or.ic4proTeamMember.userid,
        })),

      ic4proAttachments: data.ic4proAttachments,
      ic4proOriginator: data.ic4proOriginator,
      ic4proOriginatorRole: data.ic4proOriginatorRole,
      ic4proNotificationStatus: data.ic4proNotificationStatus,
      ic4proMisId: data.ic4proMisId,
      ic4proMisStatus: data.ic4proMisStatus,
      ic4proRecallReason: data.ic4proRecallReason,
      ic4proRecallMsg: data.ic4proRecallMsg,
      ic4proRecaller: data.ic4proRecaller,
      ic4proRecallerRole: data.ic4proRecallerRole,
      ic4proOperation: data.ic4proOperation.ic4proFunction,
      ic4proWorkstation: data.ic4proWorkstation,
      
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
        // location={{
        //   handleLocalityChange, handleLanguageChange, handleCountryChange, localList, local, langList, lang, country,
        // }}
        datas={{
          data,
          optionData,
          coverageData,
          zoneData,
          usersJson,
          riskStatusData,
          designateData,
          modalData,
          riskassessData,
          overdueTimeData,
          operationData,
          statusColorsData
        }}
      >
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal.Header closeButton={false} style={{backgroundColor:"#2196F3", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", padding: '2px'}}>
              FAINS Deleted </Modal.Title>
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
            <FainsDelDetails />
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
