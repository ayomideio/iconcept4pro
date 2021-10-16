import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { options } from "../Data/options.js";
import Datepicker from "../Shared/Datepicker";
// import usersJson from '../Data/ic4pro_users.json';
// import zoneData from '../Data/ic4pro_zone.json';
//import optionData from '../Data/ic4pro_headoffice.json';
import coverageData from '../Data/ic4pro_coverages.json';
import Autocomplete from './Autocomplete';
import './App.css';


const styles = {
    cursor:"pointer",
    marginLeft:"-0.7rem",
    color:"green",
    marginTop:'1rem'
  };
  
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }


const StepThree = () => {

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

  const { fields, append, remove, prepend, swap } = useFieldArray({
    control,
    name: 'ic4proOtherReceivers',
  });

  const { fields: externalReceiversFields, append: externalReceiversAppend, remove: externalReceiversRemove } = useFieldArray({
    control,
    name: 'ic4proExternalReceivers',
  });

  const [users, setUsers] = useState([...usersJson])

  const [ designates, setDesignates] = useState([...designateData])

  const watchOtherReceivers = useWatch({ name: 'ic4proOtherReceivers' });
  const prevWatchOtherReceivers = usePrevious(watchOtherReceivers)
  // const preWatchKeyOfficers = usePrevious(watchKeyOfficers)

  useEffect(() => {
    if (watchOtherReceivers && !compare(watchOtherReceivers, prevWatchOtherReceivers)) {
      setUsers(prevOtherReceivers => {
        const newWatchOtherReceivers = watchOtherReceivers.map(ko => ko.ic4proOthersOfficer?.userid);
        const newOtherReceivers = prevOtherReceivers?.map(u => ({ ...u, isDisabled: newWatchOtherReceivers.includes(u.userid) }))
        return newOtherReceivers;
      })
    }
  }, [watchOtherReceivers, prevWatchOtherReceivers, users])

  const watchExternalReceivers = useWatch({ name: 'ic4proExternalReceivers' });
  const prevWatchExternalReceivers = usePrevious(watchExternalReceivers)
  // const preWatchKeyOfficers = usePrevious(watchKeyOfficers)

  useEffect(() => {
    if (watchExternalReceivers && !compare(watchExternalReceivers, prevWatchExternalReceivers)) {
      setUsers(prevExternalReceivers => {
        const newWatchExternalReceivers = watchExternalReceivers.map(ko => ko.ic4proExtReceiver?.userid);
        const newExternalReceivers = prevExternalReceivers?.map(u => ({ ...u, isDisabled: newWatchExternalReceivers.includes(u.userid) }))
        return newExternalReceivers;
      })
    }
  }, [watchExternalReceivers, prevWatchExternalReceivers, users])


  const getMember = useCallback((ic4proMemberLevel) => {
    const memberFind = usersJson.find(ur => ur.gradelevel === ic4proMemberLevel)
    return memberFind?.gradelevel;
  }, []);

  const watchIc4proContactOfficer = useWatch({ name: 'ic4proContactOfficer' });

//   const watchIc4proTeamLeader = useWatch({ name: 'ic4proTeamLeader' });

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

  const getOfficer = useCallback((ic4proOfficerName) => {
    const officerFind = usersJson.find(ur => ur.designate === ic4proOfficerName)
    return officerFind?.fullName;
  }, []);

  // const getOfficer = useCallback((ic4proOthersOfficer) => {
  //   const officerFind = usersJson.find(ur => ur.userid === ic4proOthersOfficer)
  //   return officerFind?.fullName;
  // }, []);


    return (
        <div>
            <Accordion defaultActiveKey="3">
          <Accordion.Toggle as={Card.Header} eventKey="3" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Contact Officers
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <>
              {/* <Row className="mt-2">
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
                
              </Row> */}

              </>
          </Accordion.Collapse>
        </Accordion>
              

        <Accordion defaultActiveKey="4">
          <Accordion.Toggle as={Card.Header} eventKey="4" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Other Receivers
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
              <>
                {fields.map((item, index) => (
                  <>
                    <Row key={item.id} className="mt-2">
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} controlId={`ic4proOtherReceivers[${index}].ic4proOthersOfficer`}>
                          <Form.Label column sm="3" className="mb-4 text-center">
                              Others Officer
                          </Form.Label>
                          <Col sm="9">
                            <Controller
                              name={`ic4proOtherReceivers[${index}].ic4proOthersOfficer`}
                              as={Select}
                              options={users}
                              control={control}
                              getOptionValue={option => option.userid}
                              getOptionLabel={option => option.fullName}
                              placeholder="Others Officer  ..."
                              rules={{ required: 'Others Officer is required!' }}
                              isInvalid={errors.ic4proOtherReceivers?.[index]?.ic4proOthersOfficer}
                              disabled={mode === 'view' || mode === 'delete'}
                              defaultValue={item.ic4proOthersOfficer || ""}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} >
                          <Form.Label column sm="3" controlId={`ic4proOtherReceivers[${index}].ic4proOthersDesignate`} className="mb-4 text-center">
                            Officer Name
                          </Form.Label>
                          <Col sm="7">
                            <Form.Control
                              type="text"
                              name={`ic4proOtherReceivers[${index}].ic4proOthersDesignate`}
                              ref={register}
                              defaultValue={getDesignate(watchOtherReceivers?.[index]?.ic4proOthersOfficer?.designate)}
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

              
          </Accordion.Collapse>
        </Accordion>
        <Accordion defaultActiveKey="5">
          <Accordion.Toggle as={Card.Header} eventKey="5" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            External Receivers
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="5">
              <>
                {externalReceiversFields.map((item, index) => (
                  <>
                    <Row key={item.id} className="mt-2">
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} controlId={`ic4proExternalReceivers[${index}].ic4proExtReceiver`}>
                          <Form.Label column sm="3" className="mb-4 text-center">
                            External Receiver
                          </Form.Label>
                          <Col sm="9">
                            <Controller
                              name={`ic4proExternalReceivers[${index}].ic4proExtReceiver`}
                              as={Select}
                              options={users}
                              control={control}
                              getOptionValue={option => option.userid}
                              getOptionLabel={option => option.fullName}
                              placeholder="External Receiver  ..."
                              rules={{ required: 'External Receiver is required!' }}
                              isInvalid={errors.ic4proExternalReceivers?.[index]?.ic4proExtReceiver}
                              disabled={mode === 'view' || mode === 'delete'}
                              defaultValue={item.ic4proExtReceiver || ""}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} >
                          <Form.Label column sm="3" controlId={`ic4proExternalReceivers[${index}].ic4proExtDesignate`} className="mb-4 text-center">
                          External Designate
                          </Form.Label>
                          <Col sm="7">
                            <Form.Control
                              type="text"
                              name={`ic4proExternalReceivers[${index}].ic4proExtDesignate`}
                              ref={register}
                              defaultValue={getDesignate(watchExternalReceivers?.[index]?.ic4proExtReceiver?.designate)}
                              disabled
                            />
                          </Col>
                          {(mode === 'create' || mode === 'edit') && (
                            <Form.Group as={Col} style={{ marginTop: '4px', maxHeight: '1.8rem' }} >
                              <Button variant="danger" className="ml-1" size="sm" 
                              style={{ height: '1.8rem' }} onClick={() => externalReceiversRemove(index)}>Delete</Button>
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
                      type="button" onClick={externalReceiversAppend}>Add</Button>
                  </Form.Group>
                )}
              </>

              
          </Accordion.Collapse>
        </Accordion>

        {/* <Accordion defaultActiveKey="6">
          <Accordion.Toggle as={Card.Header} eventKey="6" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            External Receivers
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
              <>

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
              

            </>
          </Accordion.Collapse>
        </Accordion> */}
            
        </div>
    )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(StepThree, compare);
