import React, { useState,useEffect,useRef} from 'react';
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

const NotifierDetails = () => {
   
  const { register, errors, control, mode, datas, location} = useFormContext();
  const {
    data,
    coverageData,
    optionData,
    zoneData,
    designateData,
    usersJson,
    statusData,
    conditionData,
  } = datas;
  
  // const {handleCountryChange, handleLanguageChange, handleLocalityChange, country, lang, local, localList, langList} = location;
  
  // const { fields, append, remove, prepend, swap } = useFieldArray({
  //   control,
  //   name: 'keyOfficers',
  // });

  const { fields, append, remove, prepend, swap } = useFieldArray({
    control,
    name: 'otherNotifiers',
  });

  const { fields: conditionsField, append: conditionsAppend, remove: conditionsRemove } = useFieldArray({
    control,
    name: 'conditions',
  });

  const { fields: branchesFields, append: branchesAppend, remove: branchesRemove  } = useFieldArray({
    control,
    name: 'branches',
  });

  // const watchKeyOfficers = useWatch({ name: 'accessedBy', fields: 'designate'});
  // const [users, setUsers ] = useState([...coverageData]);
  // const [region, setRegion ] = useState([...regionData]);

  const [ users, setUsers ] = useState([...usersJson])

  const [ status, setStatus ] = useState([...statusData])

  const [ condition, setCondition ] = useState([...conditionData])

  const watchKeyOfficers = useWatch({name: 'keyOfficers'});
  const preWatchKeyOfficers = usePrevious(watchKeyOfficers)

  

  useEffect(() => {
    if(watchKeyOfficers){
      setUsers(prevUsers => {
        const newWatchKeyOfficers = watchKeyOfficers.map(ko => ko.staffName?.userid);
        const newUsers = prevUsers?.map(u => ({ ...u, isDisabled: newWatchKeyOfficers.includes(u.userid) }))
        return newUsers;
      })
    }
  }, [ watchKeyOfficers])

  const watchOtherNotifiers = useWatch({name: 'otherNotifiers'});
  const preWatchOtherNotifiers = usePrevious(watchOtherNotifiers)

  

  useEffect(() => {
    if(watchOtherNotifiers){
      setUsers(prevNotifiers => {
        const newWatchOtherNotifiers = watchOtherNotifiers.map(ko => ko.otherNotifier?.userid);
        const newNotifiers = prevNotifiers?.map(u => ({ ...u, isDisabled: newWatchOtherNotifiers.includes(u.userid) }))
        return newNotifiers;
      })
    }
  }, [ watchOtherNotifiers ])

  const watchOtherStatus = useWatch({name: 'otherNotifiers'});
  const preWatchOtherStatus = usePrevious(watchOtherStatus)

  

  useEffect(() => {
    if(watchOtherStatus){
      setStatus(prevStatus => {
        const newWatchOtherStatus = watchOtherStatus.map(os => os.otherStatus?.statusID);
        const newStatus = prevStatus?.map(u => ({ ...u, isDisabled: newWatchOtherStatus.includes(u.statusID) }))
        return newStatus;
      })
    }
  }, [ watchOtherStatus ])

  const watchCondition = useWatch({name: 'conditions'});
  const preWatchCondition = usePrevious(watchCondition)

  

  useEffect(() => {
    if(watchCondition){
      setCondition(prevCondition => {
        const newWatchCondition = watchCondition.map(os => os.specialCondition?.conditionId);
        const newCondition = prevCondition?.map(u => ({ ...u, isDisabled: newWatchCondition.includes(u.conditionId) }))
        return newCondition;
      })
    }
  }, [ watchCondition ])



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
  const [text, setText]=React.useState();
   
  
  
  return (
    <div>
      <Card className="border-0">

      <Accordion defaultActiveKey = "0">
      <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{ background:"#E63A3A", marginTop:"1rem", color:"white", 
                padding:"1px", maxHeight:"1.5rem"}}
                   >
                  Notifier Detials
                 </Accordion.Toggle>
                 
                 <Accordion.Collapse eventKey="0">
                 <>
                 <Row>
                  <Col>
                  <Form.Group as={Row} controlId="notifierid">
                    <Form.Label column sm="3" className="mt-2  text-center">
                    Notifier*
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                       type="text"
                       name="notifierid"
                       ref={register}
                       onChange={handleChange}
                       style={{ height: '1.8rem' }}
                       //required
                       disabled={mode === 'edit' || mode === 'view' || mode === 'delete'}
                      />
                       <Form.Control.Feedback type="invalid">
                        Please enter  Notifier!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>

                  <Col style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="designate">
                    <Form.Label column sm="3" className="mt-0.3  text-center">
                       Model ID
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                      type="number"
                      name="modelid"
                      isInvalid={errors.modelid}
                      placeholder="Model ID..."
                      ref={register({
                        required: 'Model ID is required!',
                        min: {
                          value: 201,
                          message: 'Minimum value is 201!'
                        },
                        max: {
                          value: 299,
                          message: 'Max value is 299!'
                        }
                        })}
                        style={{marginTop:0, marginBottom:0}}
                        defaultValue=""
                        disabled={mode === 'view' || mode === 'delete'}
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  
                </Row> 

              <Row>
              
              <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="description">
                    <Form.Label column sm="3" className="mt-2  text-center">
                    Description *
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                      type="text"
                      name="description"
                      style={{ height: '1.8rem' }}
                      disabled={mode === 'view' || mode === 'delete'}
                      ref={register}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Description!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>

              <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4prolanguage">
                    <Form.Label column sm="3" className="mt-2  text-center">
                    Language*
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                      type="text"
                     // ref={register}
                      name="ic4prolanguage"
                      defaultValue="en"
                      readOnly
                      style ={{height:'1.8rem'}}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Language!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>
                 
                </Row>  
                <Row>
                <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="notifierId">
                    <Form.Label column sm="3" className="mt-0.3  text-center">
                    Notifier Id *
                    </Form.Label>
                    <Col sm="9">
                    <Controller
                        name="notifierId"
                        as={Select}
                        options={users}
                        control={control}
                        getOptionValue={option => option.userid}
                        getOptionLabel={option => option.userid}
                        placeholder="Notifier ID  ..."
                        rules={{ required: 'Notifier is required!' }}
                        isInvalid={errors.notifierId}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                       />
                    </Col>
                  </Form.Group>
                  </Col>
                  
                  <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="notifierStatus">
                    <Form.Label column sm="3" className="mt-0.3  text-center">
                    Notifier Status*
                    </Form.Label>
                    <Col sm="9">
                    <Controller
                    name="notifierStatus"
                    as={Select}
                    options={statusData}
                    control={control}
                    getOptionValue={option => option.statusID}
                    getOptionLabel={option => option.statusID}
                    placeholder="Notifier Status ..."
                    rules={{ required: 'Notifier Status is required!' }}
                    isInvalid={errors.notifierStatus}
                    disabled={mode === 'view' || mode === 'delete'}
                    defaultValue=""
                    />
                    </Col>
                    <Form.Control.Feedback type="invalid">
                    Please select Notifier Status!
                        </Form.Control.Feedback>
                  </Form.Group>
                  </Col>

                </Row>  
                <Row>
                
                {conditionsField.map((item, index) => (
                          <>
                  <Col sm="6" style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row}  controlId={`conditions[${index}].specialCondition`}>
                    <Form.Label column sm="3" className="mt-0.3  text-center">
                      Conditions
                    </Form.Label>
                    <Col sm="7">
                    <Controller
                    name={`conditions[${index}].specialCondition`}
                    as={Select}
                    options={condition}
                    control={control}
                    getOptionValue={option => option.conditionId}
                    getOptionLabel={option => option.conditionId}
                    placeholder="Special Condition ..."
                    rules={{ required: 'Special Condition is required!' }}
                    isInvalid={errors.specialCondition}
                    disabled={mode === 'view' || mode === 'delete'}
                    defaultValue={item.specialCondition || " "}
                    />
                    </Col>
                    {mode !== 'view' && mode !== 'delete' && (
                              <Col sm="1" style={{marginTop:"0.1rem"}}>
                               <Button variant="danger" onClick={() => conditionsRemove(index)}
                                size="sm" style={{height: '1.8rem', width:'4.5rem', marginTop: 0,}}>
                                  Delete
                                </Button>
                              </Col>
                            )}
                </Form.Group>
                  
                  </Col>

                  <Col sm="6" key={item.id} style={{marginTop:"1rem"}}>
                  <Form.Group as={Row}>
                    <Form.Label column sm="3" className="mt-0.3  text-center">
                    
                    </Form.Label>
                    <Col sm="7">
                    
                    </Col>

                    
                </Form.Group>
                  
                  </Col>
                          </>
                        ))}
                        {/* {mode !== 'view' && mode !== 'delete' && (
                          <Button variant="primary" size="sm" 
                          style={{maxWidth:'5rem', maxHeight:'1.8rem', marginLeft:'1.5rem', marginTop:'0.5rem'}}
                           type="button" onClick={conditionsPrepend}>Prepend</Button>
                        )}  */}

                        {mode !== 'view' && mode !== 'delete' && (
                         <Button variant="success" size="sm" 
                         style={{maxWidth:'4rem', maxHeight:'1.8rem', marginLeft:'1rem', marginTop:'0.5rem'}} 
                         type="button" onClick={conditionsAppend}>Add</Button>
                        )} 

                </Row>


                </>
                </Accordion.Collapse>
                 
                </Accordion>

                <Row className="mb-3">
                  <Col>
                  
                  <Accordion defaultActiveKey = "1">

                  <Accordion.Toggle as={Card.Header} eventKey="1" className="font-weight-bold" style={{ background:"#E63A3A", marginTop:"0.5rem",color:"white", 
                padding:"1px", maxHeight:"1.5rem"}}
                   >
                  Other Notifiers 
                 </Accordion.Toggle>
                    
                 <Accordion.Collapse eventKey="1">
                 <>

                 {fields.map((item, index) => (
            <Row key={item.id}>
              {/* <Col xs="12">
                <h5>Inspector {index + 1}</h5>
              </Col> */}
              <Col>
                <Row>
                  <Form.Group as={Col} md="4" controlId={`otherNotifiers[${index}].otherNotifier`}>
                    <Form.Label>
                    Other Notifier
                    </Form.Label>
                    <Controller
                      name={`otherNotifiers[${index}].otherNotifier`}
                      as={Select}
                      options = {users}
                      control={control}
                      getOptionValue={option => option.userid}
                      getOptionLabel={option => `${option.title}. ${option.firstName} ${option.lastName}`}
                      rules={{ required: 'Other Notifier is required!' }}
                      isInvalid={errors.otherNotifiers?.[index]?.otherNotifier}
                      disabled={mode === 'view' || mode === 'delete'}
                      defaultValue={item.otherNotifier || ""}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId={`otherNotifiers[${index}].otherCondition`}>
                    <Form.Label>
                    Other Condition
                    </Form.Label>
                    <Controller
                      name={`otherNotifiers[${index}].otherCondition`}
                      as={Select}
                      options = {condition}
                      control={control}
                      getOptionValue={option => option.conditionId}
                      getOptionLabel={option => option.conditionId}
                      rules={{ required: 'Other Condition is required!' }}
                      isInvalid={errors.otherNotifiers?.[index]?.otherCondition}
                      disabled={mode === 'view' || mode === 'delete'}
                      defaultValue={item.otherCondition || ""}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId={`otherNotifiers[${index}].otherStatus`}>
                    <Form.Label>
                    Other Status*
                    </Form.Label>
                    <Controller
                      name={`otherNotifiers[${index}].otherStatus`}
                      as={Select}
                      options = {status}
                      control={control}
                      getOptionValue={option => option.statusID}
                      getOptionLabel={option => option.description}
                      rules={{ required: 'Other Status is required!' }}
                      isInvalid={errors.otherNotifiers?.[index]?.otherStatus}
                      disabled={mode === 'view' || mode === 'delete'}
                      defaultValue={item.otherStatus || ""}
                    />
                  </Form.Group>
                  {(mode === 'create' || mode === 'edit') && (
                  <Form.Group as={Col} style={{marginTop:0, maxHeight:'1.8rem'}} >
                  <Button variant="danger"  className="ml-1"  size="sm" style ={{height:'1.8rem'}} onClick={() => remove(index)}>Delete</Button>
                </Form.Group>
                  )}
                </Row>
                
              </Col>
              
            </Row>
          ))}
          {(mode === 'create' || mode === 'edit') && (
          <Form.Group>
            <Button variant="success" size="sm" 
            style={{maxWidth:'4rem', maxHeight:'1.8rem', marginLeft:'1rem', marginTop:'0.5rem'}} 
            type="button" onClick={append}>Add</Button>
          </Form.Group>
          )}
                        
                        </>
                </Accordion.Collapse>
                 
                </Accordion>     
                      </Col>
                </Row>

                <Accordion defaultActiveKey = "2">

                  <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold" style={{ background:"#E63A3A", marginTop:"0.5rem",color:"white", 
                padding:"1px", maxHeight:"1.5rem"}}
                   >
                  Special Message  
                 </Accordion.Toggle>
                
                 <Accordion.Collapse eventKey="2">
                 <>
                <Row>
                <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="specialMessage">
                    <Col sm="12">
                      <Form.Control
                      as="textarea"
                      rows="5"
                     // ref={register}
                      name="specialMessage"
                      ref={register}
                      placeholder="Special Message..."
                      />
                    </Col>
                  </Form.Group>
                  </Col>

                  
                </Row>

                </>
                </Accordion.Collapse>
                </Accordion> 
                
                <Accordion defaultActiveKey = "3">

                <Accordion.Toggle as={Card.Header} eventKey="3" className="font-weight-bold" style={{ background:"#E63A3A", marginTop:"0.5rem",color:"white", 
                padding:"1px", maxHeight:"1.5rem"}}
                   >
                  Audit Log Details
                 </Accordion.Toggle>

                 <Accordion.Collapse eventKey="3">
                 <>
                 <Row>
                <Col>
                  <Form.Group as={Row} controlId="recordDate">
                    <Form.Label column sm="3" className="mt-2 text-right">
                    Record Date
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                       // type="text"
                       name="recordDate"
                       ref={register}
                       style ={{height:'1.8rem'}}
                       value={moment().format('YYYYMMDD')}
                       disabled
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group as={Row} controlId="recordTime">
                    <Form.Label column sm="3" className="mt-2  text-right">
                    Record Time
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                      //type="text"
                      name="recordTime"
                      ref={register}
                      style ={{height:'1.8rem'}}
                      value={moment().format('hh:mm:ss')}
                      disabled />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="operator">
                    <Form.Label column sm="3" className="mt-2  text-right">
                    Operator
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="operator"
                      defaultValue="adroit"
                      disabled
                      style ={{height:'1.8rem'}}
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="operation">
                    <Form.Label column sm="3" className="mt-2  text-right">
                    Operation
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      //type="text"
                      name="operation"
                      ref={register}
                      style ={{height:'1.8rem'}}
                      defaultValue={getOperation(mode)}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="workstation">
                    <Form.Label column sm="3" className="mt-2  text-right">
                    Workstation
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                    type="text"
                    name="workstation"
                    style ={{height:'1.8rem'}}
                    disabled
                      /> 
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="recordCounter">
                    <Form.Label column sm="3" className="mt-2  text-right">
                    No. Counter
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      // type="text"
                      name="recordCounter" 
                      ref={register}
                      style ={{height:'1.8rem'}}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row> 

                </>
                </Accordion.Collapse>
                </Accordion>      
                </Card>
    </div>
  )
}

export default NotifierDetails;
