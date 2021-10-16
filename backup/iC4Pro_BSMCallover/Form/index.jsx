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
import reasonData from '../Data/ic4pro_reasons.json';
import operationData from '../Data/ic4pro_operations.json';
import riskassessData from '../Data/ic4pro_riskassessment.json';
import overdueTimeData from '../Data/ic4pro_overduetime.json';
//import designateData from '../Data/ic4pro_designate.json';
import FAINT from './FAINT';
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
        ic4proFaintId: selectedData.ic4proFaintId,
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
        ic4proReason: reasonData.find(rd => rd.ic4proReasonId === selectedData.ic4proReason),
        ic4proScope: concatData.find(cd => cd.ic4proConcatId === selectedData.ic4proScope),
        ic4proMessage: selectedData.ic4proMessage,
        ic4proContactDesignate: selectedData.ic4proContactDesignate,
        ic4proContactOfficer: usersJson.find(id => id.userid === selectedData.ic4proContactOfficer),

        ic4proOtherScopes: selectedData.ic4proOtherScopes.map(or => ({
          ic4proOtherScope: concatData.find(uj => uj.ic4proConcatId === or.ic4proOtherScope)
        })),

        ic4proOtherReceivers: selectedData.ic4proOtherReceivers.map(or => ({
          ic4proOthersOfficer: usersJson.find(uj => uj.userid === or.ic4proOthersOfficer)
        })),

        ic4proExternalReceivers: selectedData.ic4proExternalReceivers.map(or => ({
          ic4proExtReceiver: usersJson.find(uj => uj.userid === or.ic4proExtReceiver)
        })),
        // ic4proExternalReceivers: usersJson.find(er => er.userid === selectedData.ic4proExternalReceivers),
        ic4proTeamLeader: usersJson.find(er => er.userid === selectedData.ic4proTeamLeader),

        ic4proTeamMembers: selectedData.ic4proTeamMembers.map(or => ({
          ic4proMember: usersJson.find(uj => uj.userid === or.ic4proMember)
        })),

        ic4proAttachments: selectedData.ic4proAttachments.map(or => ({
          ic4proAttachedId: or.ic4proAttachedId,
          ic4proAttachedBy: or.ic4proAttachedBy,
          ic4proDateTime: moment(or.ic4proDateTime, 'YYYYMMDD HH:mm').toDate(),
        })),

        ic4proRecallReason: selectedData.ic4proRecallReason,
        ic4proRecallMsg: selectedData.ic4proRecallMsg,
        ic4proRecaller: selectedData.ic4proRecaller,
        ic4proRecallerRole: selectedData.ic4proRecallerRole,

        ic4proPreparer: selectedData.ic4proPreparer,
        ic4proPreparerRole: selectedData.ic4proPreparerRole,
        ic4proFaintStatus: selectedData.ic4proFaintStatus,
        ic4proAims: selectedData.ic4proAims,
        ic4proAimsStatus: selectedData.ic4proAimsStatus,

        ic4proPublishFlag: selectedData.ic4proPublishFlag,
        ic4proPublishDate: selectedData.ic4proPublishDate,
        ic4proPublisher: selectedData.ic4proPublisher,
        ic4proBuildFlag: selectedData.ic4proBuildFlag,
        ic4proBuildDate: selectedData.ic4proBuildDate,
        ic4proBuilder: selectedData.ic4proBuilder,
        
        
        ic4proLanguage: selectedData.ic4proLanguage,
        ic4proWorkstation: selectedData.ic4proWorkstation,
        
        // relationship: zoneData.find(rd => rd.key === selectedData.relationship),
        // designate: designateData.find(rd => rd.designate_id === selectedData.designate),
        // keyOfficers: selectedData.keyOfficers.map(sd => ({
        //   staffName: usersJson.find(uj => uj.userid === sd.staffName)
        // })),
        // branches: selectedData.branches.map( brc => ({
        //   branch: brc.branch
        // })),
        // accessedBy: selectedData.keyOfficers.map(sob => ({
        // designate: coverageData.find(ad => ad.description === sob.designate),
        // officers: sob.officerId.map(sof => (userData.find(ud => sof.officename === ud.userid)))
        //  })),
         

        ic4proRecordCounter: parseInt(selectedData.ic4proRecordCounter),

      })

    } else {
      
      reset({
      ic4proFaintId: '',
      ic4proReference: '',
      ic4proLocation: '',
      ic4proInspectionType: '',
      // ic4proOperation: '',
      ic4proAuditDateFrom: '',
      ic4proAuditDateTo: '',
      ic4proVisitDateFrom: '',
      ic4proVisitDateTo: '',
      ic4proExitMeetingDa: '',
      ic4proDepartment: '',
      ic4proNotification: '',
      ic4proReason: '',
      // ic4proScope: '',
      ic4proMessage: '',
      ic4proContactDesignate: '',
      // ic4proContactOfficer: '',

      ic4proOtherScopes: [{}],

      ic4proOtherReceivers: [{}],

      ic4proExternalReceivers: [{}],
      // ic4proExternalReceivers: usersJson.find(er => er.userid === selectedData.ic4proExternalReceivers),
      ic4proTeamLeader: '',

      ic4proTeamMembers: [{}],

      ic4proAttachments: [{}],

      ic4proRecallReason: '',
      ic4proRecallMsg: '',
      ic4proRecaller: '',
      ic4proRecallerRole: '',

      ic4proPreparer: '',
      ic4proPreparerRole: '',
      ic4proFaintStatus: '',
      ic4proAims: '',
      ic4proAimsStatus: '',

      ic4proPublishFlag: '',
      ic4proPublishDate: '',
      ic4proPublisher: '',
      ic4proBuildFlag: '',
      ic4proBuildDate: '',
      ic4proBuilder: '',
      
      
      ic4proLanguage: '',
      ic4proWorkstation: '',
      // ic4proRecordCounter: 0,
      })
    }

  }, [mode, reset, selectedData])

  const onSubmit = data => {
    const newData = {
      ...data,
      ic4proFaintId: data.ic4proFaintId,
      ic4proReference: data.ic4proReference,
      ic4proLocation: data.ic4proLocation,
      ic4proInspectionType: data.ic4proInspectionType,
      // ic4proOperation: data.ic4proOperation.ic4proFunction,
      ic4proAuditDateFrom: moment(data.ic4proAuditDateFrom, 'YYYYMMDD').toDate(),
      ic4proAuditDateTo: moment(data.ic4proAuditDateTo, 'YYYYMMDD').toDate(),
      ic4proVisitDateFrom: moment(data.ic4proVisitDateFrom, 'YYYYMMDD').toDate(),
      ic4proVisitDateTo: moment(data.ic4proVisitDateTo, 'YYYYMMDD').toDate(),
      ic4proExitMeetingDate: moment(data.ic4proExitMeetingDate, 'YYYYMMDD').toDate(),
      ic4proDepartment: data.ic4proDepartment,
      ic4proNotification: data.ic4proNotification,
      ic4proReason: data.ic4proReason,
      // ic4proScope: data.ic4proScope.ic4proConcatId,
      ic4proMessage: data.ic4proMessage,
      ic4proContactDesignate: data.ic4proContactDesignate,
      // ic4proContactOfficer: data.ic4proContactOfficer.userid,

      ic4proOtherScopes: data.ic4proOtherScopes.map(or => ({
        ...or,
        ic4proOtherScope: or.ic4proOtherScope.ic4proConcatId
      })),

      ic4proOtherReceivers: data.ic4proOtherReceivers.map(or => ({
        ...or,
        ic4proOthersOfficer: or.ic4proOthersOfficer.userid
      })),

      ic4proExternalReceivers: data.ic4proExternalReceivers.map(or => ({
        ic4proExtReceiver: or.ic4proExtReceiver.userid
      })),
      // ic4proExternalReceivers: usersJson.find(er => er.userid === selectedData.ic4proExternalReceivers),
      ic4proTeamLeader: data.ic4proTeamLeader.userid,

      ic4proTeamMembers: data.ic4proTeamMembers.map(or => ({
        ...or,
        ic4proMember: or.ic4proMember.userid
      })),

      ic4proAttachments: data.ic4proAttachments.map(or => ({
        ...or,
        ic4proAttachedId: or.ic4proAttachedId,
        ic4proAttachedBy: or.ic4proAttachedBy,
        ic4proDateTime: moment(or.ic4proDateTime, 'YYYYMMDD hh:mm').toDate(),
      })),

      ic4proRecallReason: data.ic4proRecallReason,
      ic4proRecallMsg: data.ic4proRecallMsg,
      ic4proRecaller: data.ic4proRecaller,
      ic4proRecallerRole: data.ic4proRecallerRole,

      ic4proPreparer: data.ic4proPreparer,
      ic4proPreparerRole: data.ic4proPreparerRole,
      ic4proFaintStatus: data.ic4proFaintStatus,
      ic4proAims: data.ic4proAims,
      ic4proAimsStatus: data.ic4proAimsStatus,

      ic4proPublishFlag: data.ic4proPublishFlag,
      ic4proPublishDate: data.ic4proPublishDate,
      ic4proPublisher: data.ic4proPublisher,
      ic4proBuildFlag: data.ic4proBuildFlag,
      ic4proBuildDate: data.ic4proBuildDate,
      ic4proBuilder: data.ic4proBuilder,
      
      
      ic4proLanguage: data.ic4proLanguage,
      ic4proWorkstation: data.ic4proWorkstation,
      
      // keyOfficers: data.keyOfficers.map(ko => ({
      //   ...ko,
      //   staffName: ko.staffName.userid
      // })),
      // keyOfficers: data.accessedBy.map(sob => ({
      //   ...sob,
      //   designate: sob.designate.description,
      //   officerId: sob.officers.map(sof => ({ officename: sof.userid}))
      // })),
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
          data,
          optionData,
          coverageData,
          concatData,
          zoneData,
          usersJson,
          riskStatusData,
          departData,
          designateData,
          modalData,
          inspectData,
          riskassessData,
          overdueTimeData,
          operationData,
          statusColorsData
        }}
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
                  style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
                >
                  Cancel
              </Button>
              
              {/* <div style={{ marginRight: '1.4rem', marginBottom: '20px' }}> */}
                <Button variant="danger" className="border border-white ml-1" size="sm" style={{ maxWidth: '4rem', maxHeight: '2rem', marginTop: '3px' }}>Help</Button>
              {/* </div> */}
            </Col>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F2F2F2', padding:'0' }}>
            <FAINT />
          </Modal.Body>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export default FormContainer;
