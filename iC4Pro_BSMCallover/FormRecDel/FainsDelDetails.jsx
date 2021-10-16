import React, { useState,useEffect,useRef, useCallback} from 'react';
import { Hint } from 'react-autocomplete-hint';
import { useFormContext, Controller, useFieldArray, useWatch } from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Accordion
} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
 
import moment from 'moment';
import Select from "../Shared/Select";
import Selects from "../Shared/Selects";
import { Panel } from 'primereact/panel';
import { getOperation } from '../helper';
import {options} from "../Data/options.js";
import Datepicker from "../Shared/Datepicker";
// import usersJson from '../Data/ic4pro_users.json';
// import zoneData from '../Data/ic4pro_zone.json';
//import optionData from '../Data/ic4pro_headoffice.json';
import coverageData from '../Data/ic4pro_coverages.json';
import Autocomplete from './Autocomplete';
import './App.css';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FainsDelDetails = () => {
   
  const { register, errors, control, mode, datas, location } = useFormContext();
  const {
    data,
    coverageData,
    optionData,
    zoneData,
    concatData,
    designateData,
    usersJson,
    inspectData,
    modalData,
    riskassessData,
    riskStatusData,
    departData,
    overdueTimeData,
    operationData,
    statusColorsData
  } = datas;

  // const {handleCountryChange, handleLanguageChange, handleLocalityChange, country, lang, local, localList, langList} = location;

  const { fields, append, remove, prepend, swap } = useFieldArray({
    control,
    name: 'ic4proOtherReceivers',
  });

  const { fields: TeamMembersFields, append: TeamMembersAppend, remove: TeamMembersRemove } = useFieldArray({
    control,
    name: 'ic4proTeamMembers',
  });

  // const watchKeyOfficers = useWatch({ name: 'accessedBy', fields: 'designate'});
  // const [users, setUsers ] = useState([...coverageData]);
  // const [region, setRegion ] = useState([...regionData]);

  const [users, setUsers] = useState([...usersJson])

  const [ designates, setDesignates] = useState([...designateData])

  const watchOtherReceivers = useWatch({ name: 'ic4proOtherReceivers' });
  // const preWatchKeyOfficers = usePrevious(watchKeyOfficers)

  useEffect(() => {
    if (watchOtherReceivers) {
      setDesignates(prevOtherReceivers => {
        const newWatchOtherReceivers = watchOtherReceivers.map(ko => ko.ic4proOfficerDesignate?.designate_id);
        const newOtherReceivers = prevOtherReceivers?.map(u => ({ ...u, isDisabled: newWatchOtherReceivers.includes(u.designate_id) }))
        return newOtherReceivers;
      })
    }
  }, [watchOtherReceivers])

  const getOfficer = useCallback((ic4proOfficerName) => {
    const officerFind = usersJson.find(ur => ur.designate === ic4proOfficerName)
    return officerFind?.fullName;
  }, []);

  const watchTeamMembers = useWatch({ name: 'ic4proTeamMembers' });
  // const preWatchKeyOfficers = usePrevious(watchKeyOfficers)

  useEffect(() => {
    if (watchTeamMembers) {
      setUsers(prevTeamMembers => {
        const newWatchTeamMembers = watchTeamMembers.map(ko => ko.ic4proTeamMember?.userid);
        const newTeamMembers = prevTeamMembers?.map(u => ({ ...u, isDisabled: newWatchTeamMembers.includes(u.userid) }))
        return newTeamMembers;
      })
    }
  }, [watchTeamMembers])

  const getMember = useCallback((ic4proMemberLevel) => {
    const memberFind = usersJson.find(ur => ur.gradelevel === ic4proMemberLevel)
    return memberFind?.gradelevel;
  }, []);

  const watchIc4proContactOfficer = useWatch({ name: 'ic4proContactOfficer' });

  const watchIc4proTeamLeader = useWatch({ name: 'ic4proTeamLeader' });

  const getIc4proContactOfficer = useCallback((ic4proContactDesignate) => {
    const memberIc4proContactOfficer = users.find(ur => ur.designate === ic4proContactDesignate)
    return memberIc4proContactOfficer?.designate;
  }, []);


  const getDesignate = useCallback((designate) => {
    const designateFind = users.find(de => de.designate === designate)
    return designateFind?.designate;
  }, []);

  const getLevel = useCallback((gradelevel) => {
    const levelFind = users.find(de => de.gradelevel === gradelevel)
    return levelFind?.gradelevel;
  }, []);

  // const contactOfficerFiltered = React.useMemo(() => {
  //   const newContactOfficer = users.filter(dt => dt.userid === watchIc4proContactOfficer?.userid);
  //   return newContactOfficer;
  // }, [watchIc4proContactOfficer]);

  // useEffect(() => {
  //   console.log("watchKeyOfficers:",watchKeyOfficers)
  //   if(watchKeyOfficers) {
  //     setUsers(prevUsers => {
  //       const newWatchKeyOfficers = watchKeyOfficers.map(ko => ko.designate?.key);
  //       console.log("newWatchKeyOfficers:",newWatchKeyOfficers)
  //       const newUsers = prevUsers?.map(u => ({ ...u, isDisabled: newWatchKeyOfficers.includes(u.key) }))
  //       console.log("newUsers:",newUsers)
  //       return newUsers;
  //     })
  //   }
  // }, [watchKeyOfficers]);


  const handleChange = e => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  };
  const [text, setText] = React.useState();



  return (
    <div>
      <Card className="border-0">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "1rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Field Audit Notification Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proFinId">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      FAIN ID*
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proFinId"
                        ref={register}
                        defaultValue={`FAIN-${moment().format('YYYYMMDD-HHmmss')}`}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proReference">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Reference *
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proReference"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proLocation">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Location*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="ic4proLocation"
                        as={Select}
                        size="sm"
                        options={concatData}
                        control={control}
                        getOptionValue={option => option.ic4proConcatId}
                        getOptionLabel={option => option.ic4proDetails}
                        rules={{ required: 'Location is required!' }}
                        isInvalid={errors.ic4proLocation}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proInspectionType">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Inspection Type*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="ic4proInspectionType"
                        as={Select}
                        size="sm"
                        options={inspectData}
                        control={control}
                        getOptionValue={option => option.ic4proInspectTypeId}
                        getOptionLabel={option => option.ic4proInspectType}
                        rules={{ required: 'Inspection Type is required!' }}
                        isInvalid={errors.ic4proInspectionType}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proAuditDateFrom">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Audit Date From*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        control={control}
                        name="ic4proAuditDateFrom"
                        rules={{ required: 'Date' }}
                        render={({ onChange, onBlur, value }) => (
                          <Datepicker
                            onChange={onChange}
                            onBlur={onBlur}
                            isInvalid={errors.ic4proAuditDateFrom}
                            className="form-control"
                            placeholderText="Enter audit date from..."
                            selected={value}
                            dateFormat="dd/MM/yyyy"
                            disabled={mode === 'view' || mode === 'delete'}
                          />
                        )}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proAuditDateTo">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Audit Date To*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        control={control}
                        name="ic4proAuditDateTo"
                        rules={{ required: 'Date' }}
                        render={({ onChange, onBlur, value }) => (
                          <Datepicker
                            onChange={onChange}
                            onBlur={onBlur}
                            isInvalid={errors.ic4proAuditDateTo}
                            className="form-control"
                            placeholderText="Enter audit date to..."
                            selected={value}
                            dateFormat="dd/MM/yyyy"
                            disabled={mode === 'view' || mode === 'delete'}
                          />
                        )}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proVisitDateFrom">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Visit Date From*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        control={control}
                        name="ic4proVisitDateFrom"
                        rules={{ required: 'Date' }}
                        render={({ onChange, onBlur, value }) => (
                          <Datepicker
                            onChange={onChange}
                            onBlur={onBlur}
                            isInvalid={errors.ic4proVisitDateFrom}
                            className="form-control"
                            placeholderText="Enter visit date from..."
                            selected={value}
                            dateFormat="dd/MM/yyyy"
                            disabled={mode === 'view' || mode === 'delete'}
                          />
                        )}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proVisitDateTo">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Visit Date To*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        control={control}
                        name="ic4proVisitDateTo"
                        rules={{ required: 'Date' }}
                        render={({ onChange, onBlur, value }) => (
                          <Datepicker
                            onChange={onChange}
                            onBlur={onBlur}
                            isInvalid={errors.ic4proVisitDateTo}
                            className="form-control"
                            placeholderText="Enter visit date to..."
                            selected={value}
                            dateFormat="dd/MM/yyyy"
                            disabled={mode === 'view' || mode === 'delete'}
                          />
                        )}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proExitMeetingDate">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Exit Meeting Date*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        control={control}
                        name="ic4proExitMeetingDate"
                        rules={{ required: 'Date' }}
                        render={({ onChange, onBlur, value }) => (
                          <Datepicker
                            onChange={onChange}
                            onBlur={onBlur}
                            isInvalid={errors.ic4proExitMeetingDate}
                            className="form-control"
                            placeholderText="Enter exit meeting date..."
                            selected={value}
                            dateFormat="dd/MM/yyyy"
                            disabled={mode === 'view' || mode === 'delete'}
                          />
                        )}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proDepartment">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Department*
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="ic4proDepartment"
                        as={Select}
                        size="sm"
                        options={departData}
                        control={control}
                        getOptionValue={option => option.ic4proDeptId}
                        getOptionLabel={option => option.ic4proDeptId}
                        rules={{ required: 'department is required!' }}
                        isInvalid={errors.ic4proDepartment}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proNotification">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Notification
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proNotification"
                        ref={register}
                        defaultValue=""
                        disabled={mode === 'view' || mode === 'delete'}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} >
                    <Form.Label column sm="3" className="mb-4 text-center">

                    </Form.Label>
                    <Col sm="9">

                    </Col>
                  </Form.Group>
                </Col>
              </Row>

            
            </>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey="2">

          <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}
          >
            Message
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="2">
            <>


              <Col style={{ marginTop: "0.5rem" }}>
                <Form.Group as={Row} controlId="ic4proMessage">
                  <Col sm="12">
                    <Form.Control
                      as="textarea"
                      rows="5"
                      ref={register}
                      name="ic4proMessage"
                      ref={register}
                      placeholder="Message ..."
                      disabled={mode === 'view' || mode === 'delete'}
                    />
                  </Col>
                </Form.Group>
              </Col>

            </>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey="3">
          <Accordion.Toggle as={Card.Header} eventKey="3" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Contact Officers
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <>
              <Row className="mt-2">
              <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proContactOfficer">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Contact Officer
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="ic4proContactOfficer"
                        as={Select}
                        options={users}
                        control={control}
                        getOptionValue={option => option.userid}
                        getOptionLabel={option => option.userid}
                        placeholder="Contact Officer ..."
                        rules={{ required: 'Contact Officer is required!' }}
                        isInvalid={errors.ic4proContactOfficer}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proContactDesignate">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Contact Designate
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proContactDesignate"
                        ref={register}
                        value={getDesignate(watchIc4proContactOfficer?.designate)}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                
              </Row>
              <>
                {fields.map((item, index) => (
                  <>
                    <Row key={item.id} className="mt-2">
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} controlId={`ic4proOtherReceivers[${index}].ic4proOfficerDesignate`}>
                          <Form.Label column sm="3" className="mb-4 text-center">
                            Officer Designate
                          </Form.Label>
                          <Col sm="9">
                            <Controller
                              name={`ic4proOtherReceivers[${index}].ic4proOfficerDesignate`}
                              as={Select}
                              options={designates}
                              control={control}
                              getOptionValue={option => option.designate_id}
                              getOptionLabel={option => option.designate_name}
                              placeholder="Officer Designate  ..."
                              rules={{ required: 'Officer Designate is required!' }}
                              isInvalid={errors.ic4proOtherReceivers?.[index]?.ic4proOfficerDesignate}
                              disabled={mode === 'view' || mode === 'delete'}
                              defaultValue={item.ic4proOfficerDesignate || ""}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} >
                          <Form.Label column sm="3" controlId={`ic4proOtherReceivers[${index}].ic4proOfficerName`} className="mb-4 text-center">
                            Officer Name
                          </Form.Label>
                          <Col sm="7">
                            <Form.Control
                              type="text"
                              name={`ic4proOtherReceivers[${index}].ic4proOfficerName`}
                              ref={register}
                              defaultValue={getOfficer(watchOtherReceivers?.[index]?.ic4proOfficerDesignate?.designate_id)}
                              disabled
                            />
                          </Col>
                          {(mode === 'create' || mode === 'edit') && (
                            <Form.Group as={Col} style={{ marginTop: '4px', maxHeight: '1.8rem' }} >
                              <Button variant="danger" className="ml-1" size="sm" style={{ height: '1.8rem' }} onClick={() => remove(index)}>Delete</Button>
                            </Form.Group>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                ))}
                {(mode === 'create' || mode === 'edit') && (
                  <Form.Group>
                    <Button variant="success" size="sm"
                      style={{ maxWidth: '4rem', maxHeight: '1.8rem', marginLeft: '1rem', marginTop: '0.5rem' }}
                      type="button" onClick={append}>Add</Button>
                  </Form.Group>
                )}
              </>

              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proExternalReceivers">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      External Receivers
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="ic4proExternalReceivers"
                        as={Select}
                        options={users}
                        control={control}
                        getOptionValue={option => option.userid}
                        getOptionLabel={option => option.userid}
                        placeholder="Contact Officer  ..."
                        rules={{ required: 'Contact Officer is required!' }}
                        isInvalid={errors.ic4proContactOfficer}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} >
                    <Form.Label column sm="3" className="mb-4 text-center">

                    </Form.Label>
                    <Col sm="9">

                    </Col>
                  </Form.Group>
                </Col>

              </Row>
              {/* <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proNextRiskNote">
                    <Col sm="12">
                      <Form.Control
                      as="textarea"
                      rows="5"
                     ref={register}
                      name="ic4proNextRiskNote"
                      ref={register}
                      placeholder="Next Risk Note ..."
                      />
                    </Col>
                  </Form.Group>
                  </Col> */}

            </>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey="4">
          <Accordion.Toggle as={Card.Header} eventKey="4" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Field / Office Auditors
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proTeamLeader">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Team Leader
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="ic4proTeamLeader"
                        as={Select}
                        options={users}
                        control={control}
                        getOptionValue={option => option.userid}
                        getOptionLabel={option => option.userid}
                        placeholder="Team Leader ..."
                        rules={{ required: 'Team Leader is required!' }}
                        isInvalid={errors.ic4proTeamLeader}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proLeaderlevel">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Leader Level
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proLeaderlevel"
                        ref={register}
                        value={getLevel(watchIc4proTeamLeader?.gradelevel)}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <>
                {TeamMembersFields.map((item, index) => (
                  <>
                    <Row key={item.id} className="mt-2">
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} controlId={`ic4proTeamMembers[${index}].ic4proTeamMember`}>
                          <Form.Label column sm="3" className="mb-4 text-center">
                            Team Members
                          </Form.Label>
                          <Col sm="9">
                            <Controller
                              name={`ic4proTeamMembers[${index}].ic4proTeamMember`}
                              as={Select}
                              options={users}
                              control={control}
                              getOptionValue={option => option.userid}
                              getOptionLabel={option => option.userid}
                              placeholder="Team Members  ..."
                              rules={{ required: 'Team Members is required!' }}
                              isInvalid={errors.ic4proTeamMembers?.[index]?.ic4proTeamMember}
                              disabled={mode === 'view' || mode === 'delete'}
                              defaultValue={item.ic4proTeamMember || ""}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} >
                          <Form.Label column sm="3" controlId={`ic4proTeamMembers[${index}].ic4proMemberLevel`} className="mb-4 text-center">
                            Member Level
                          </Form.Label>
                          <Col sm="7">
                            <Form.Control
                              type="text"
                              name={`ic4proTeamMembers[${index}].ic4proMemberLevel`}
                              ref={register}
                              defaultValue={getMember(watchTeamMembers?.[index]?.ic4proTeamMember?.gradelevel)}
                              disabled
                            />
                          </Col>
                          {(mode === 'create' || mode === 'edit') && (
                            <Form.Group as={Col} style={{ marginTop: '4px', maxHeight: '1.8rem' }} >
                              <Button variant="danger" className="ml-1" size="sm" style={{ height: '1.8rem' }} onClick={() => TeamMembersRemove(index)}>Delete</Button>
                            </Form.Group>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                ))}
                {(mode === 'create' || mode === 'edit') && (
                  <Form.Group>
                    <Button variant="success" size="sm"
                      style={{ maxWidth: '4rem', maxHeight: '1.8rem', marginLeft: '1rem', marginTop: '0.5rem' }}
                      type="button" onClick={TeamMembersAppend}>Add</Button>
                  </Form.Group>
                )}
              </>

            </>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey="5">
          <Accordion.Toggle as={Card.Header} eventKey="5" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Attachments
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proAttachments">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Attachments*
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proAttachments"
                        ref={register}
                        defaultValue=""
                        disabled={mode === 'view' || mode === 'delete'}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} >
                    <Form.Label column sm="3" className="mb-4 text-center">

                    </Form.Label>
                    <Col sm="9">

                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey="6">

          <Accordion.Toggle as={Card.Header} eventKey="6" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Originating Officer and Status
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proOriginator">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Originator
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proOriginator"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proOriginatorRole">
                    <Form.Label column sm="3" className="mb-4 text-center">
                        Originator Role
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proOriginatorRole"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row className="mt-2">
              <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proNotificationStatus">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Notification Status
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proNotificationStatus"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proMisId">
                    <Form.Label column sm="3" className="mb-4 text-center">
                        MIS ID
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proMisId"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
              <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proMisStatus">
                    <Form.Label column sm="3" className="mb-4 text-center">
                        MIS Status
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proMisStatus"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} >
                    <Form.Label column sm="3" className="mb-4 text-center">
                       
                    </Form.Label>
                    <Col sm="9">
                    
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey="7">
          <Accordion.Toggle as={Card.Header} eventKey="7" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Originating Officer and Status
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="7">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem', marginTop: "6rem" }}>
                  <Form.Group as={Row} controlId="ic4proRecallReason">
                    <Form.Label column sm="3" className="mb-4 text-center">
                       Recall Reason
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proRecallReason"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col  style={{marginTop:"0.5rem"}}>
                  <div >
                    <fieldset className="customLegend row mt-3">
                    <legend style={{border:"1px solid", borderRadius:"3px"}}><h5>Recall Message</h5></legend>
                    <Col sm="12">
                      <Form.Control
                      as="textarea"
                      rows="5"
                      ref={register}
                      name="ic4proRecallMsg"
                      placeholder="Recall Message ..."
                      style={{border: "0"}}
                      disabled={mode === 'view' || mode === 'delete'}
                      defaultValue= ""
                    />
                    </Col>
                    </fieldset>
                  </div>
                </Col>
                {/* <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proRecallMsg">
                    <Form.Label column sm="3" className="mb-4 text-center">
                       Recall Messsage
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proRecallMsg"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col> */}
              </Row>
              
              <Row className="mt-4">
              <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proRecaller">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Recaller
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proRecaller"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proRecallerRole">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Recaller Role
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proRecallerRole"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
              <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proMisStatus">
                    <Form.Label column sm="3" className="mb-4 text-center">
                        MIS Status
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proMisStatus"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} >
                    <Form.Label column sm="3" className="mb-4 text-center">
                       
                    </Form.Label>
                    <Col sm="9">
                    
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </>
          </Accordion.Collapse>
        </Accordion>    
                
        <Card.Header className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"0.5rem",color:"white", 
                padding:"1px", maxHeight:"1.5rem"}}
                   >
                  Audit Log Details
                 </Card.Header>

                 <Row className="mt-1">
              <Col style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proLanguage">
                    <Form.Label column sm="3" className="text-center">
                    Language*
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                      type="text"
                      name="ic4proLanguage"
                      style={{ height: '1.8rem' }}
                      disabled={mode === 'view' || mode === 'delete'}
                      ref={register}
                      defaultValue="en"
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Language!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>

              <Col style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proUserLocation">
                    <Form.Label column sm="3" className="text-center">
                     User Location*
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                      type="text"
                      //ref={register}
                      name="ic4proUserLocation"
                      defaultValue="Branch001"
                      readOnly
                      style ={{height:'1.8rem'}}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Current User Location!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>
                 
                </Row>
                 <Row className="mt-1">
                <Col style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordDate">
                    <Form.Label column sm="3" className="text-center">
                    Record Date
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                       // type="text"
                       name="ic4proRecordDate"
                       ref={register}
                       style ={{height:'1.8rem'}}
                       value={moment().format('YYYYMMDD')}
                       disabled
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordTime">
                    <Form.Label column sm="3" className="text-center">
                    Record Time
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                      //type="text"
                      name="ic4proRecordTime"
                      ref={register}
                      style ={{height:'1.8rem'}}
                      value={moment().format('hh:mm:ss')}
                      disabled />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-1">
                <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proOperator">
                    <Form.Label column sm="3" className="text-center">
                    Operator
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="ic4proOperator"
                      defaultValue="adroit"
                      disabled
                      style ={{height:'1.8rem'}}
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col style={{height:'3rem'}}>
              <Form.Group as={Row} controlId="ic4proOperation">
                <Form.Label column sm="3" className="mb-4 text-center">
                  Operation
                </Form.Label>
                <Col sm="9">
                <Controller
                    name="ic4proOperation"
                    as={Select}
                    size="sm"
                    options={operationData}
                    control={control}
                    getOptionValue={option => option.ic4proFunction}
                    getOptionLabel={option => option.ic4proFunction}
                    rules={{ required: 'Operations is required!' }}
                    isInvalid={errors.ic4proOperation}
                    disabled={mode === 'view' || mode === 'delete'}
                    defaultValue=""
                  />
                </Col>
              </Form.Group>
            </Col>
                  {/* <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proOperation">
                    <Form.Label column sm="3" className="text-center">
                    Operation
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      //type="text"
                      name="ic4proOperation"
                      ref={register}
                      style ={{height:'1.8rem'}}
                      defaultValue={getOperation(mode)}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col> */}
                </Row>
                <Row className="mt-1">
                <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proWorkstation">
                    <Form.Label column sm="3" className="text-center">
                    Workstation
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                    type="text"
                    ref={register}
                    name="ic4proWorkstation"
                    style ={{height:'1.8rem'}}
                    disabled
                      /> 
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordCounter">
                    <Form.Label column sm="3" className="text-center">
                    No. Counter
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      // type="text"
                      name="ic4proRecordCounter" 
                      ref={register}
                      style ={{height:'1.8rem'}}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-1">
                <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordDeleter">
                    <Form.Label column sm="3" className="text-center">
                      Deleter
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                    type="text"
                    ref={register}
                    name="ic4proRecordDeleter"
                    style ={{height:'1.8rem'}}
                    disabled
                      /> 
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proDateDeleted">
                    <Form.Label column sm="3" className="text-center">
                      Date Deleted
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="ic4proDateDeleted" 
                      ref={register}
                      style ={{height:'1.8rem'}}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-1">
                <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proTimeDeleted">
                    <Form.Label column sm="3" className="text-center">
                      Time Deleted
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                    type="text"
                    ref={register}
                    name="ic4proTimeDeleted"
                    style ={{height:'1.8rem'}}
                    disabled
                      /> 
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proTerminal">
                    <Form.Label column sm="3" className="text-center">
                      Terminal
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="ic4proTerminal" 
                      ref={register}
                      style ={{height:'1.8rem'}}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>      
                </Card>
    </div>
  )
}

export default FainsDelDetails;
