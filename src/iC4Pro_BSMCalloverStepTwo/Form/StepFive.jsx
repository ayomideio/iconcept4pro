import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';
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

const StepFive = () => {

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

    const [users, setUsers] = useState([...usersJson])

    const { fields: AttachmentsFields, append: AttachmentsAppend, remove: AttachmentsRemove } = useFieldArray({
        control,
        name: 'ic4proAttachments',
      });
    
    //   const watchTeamMembers = useWatch({ name: 'ic4proTeamMembers' });
    //   const preWatchTeamMembers = usePrevious(watchTeamMembers)
    
    //   useEffect(() => {
    //     if (watchTeamMembers && !compare(watchTeamMembers, preWatchTeamMembers)) {
    //       setUsers(prevTeamMembers => {
    //         const newWatchTeamMembers = watchTeamMembers.map(ko => ko.ic4proMember?.userid);
    //         const newTeamMembers = prevTeamMembers?.map(u => ({ ...u, isDisabled: newWatchTeamMembers.includes(u.userid) }))
    //         return newTeamMembers;
    //       })
    //     }
    //   }, [watchTeamMembers, preWatchTeamMembers, users])

    //   const watchIc4proTeamLeader = useWatch({ name: 'ic4proTeamLeader' });
    
    //   const getMember = useCallback((ic4proMemberLevel) => {
    //     const memberFind = usersJson.find(ur => ur.gradelevel === ic4proMemberLevel)
    //     return memberFind?.gradelevel;
    //   }, []);

    //   const getLevel = useCallback((gradelevel) => {
    //     const levelFind = users.find(de => de.gradelevel === gradelevel)
    //     return levelFind?.gradelevel;
    //   }, []);

    return (
        <div>
         <Card className="border-0">
        <Accordion defaultActiveKey="4">
          <Accordion.Toggle as={Card.Header} eventKey="4" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Attachments
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
          <>
                 <Row>
                 <Form.Group as={Col} md="4">
                    <Form.Label>
                    Attached ID
                    </Form.Label>
                 </Form.Group>

                 <Form.Group as={Col} md="3">
                    <Form.Label>
                     Attached By
                    </Form.Label>
                 </Form.Group>

                 <Form.Group as={Col} md="4">
                    <Form.Label>
                     Date Time
                    </Form.Label>
                 </Form.Group>
                 </Row>

                 {AttachmentsFields.map((item, index) => (
                    <Row key={item.id}>
              {/* <Col xs="12">
                <h5>Inspector {index + 1}</h5>
              </Col> */}
              <Col>
                <Row style={{marginTop: "6px"}}>
                  <Form.Group as={Col} md="4" controlId={`ic4proAttachments[${index}].ic4proAttachedId`}>
                    
                  <Form.Control
                    type="file"
                    ref={register}
                    name={`ic4proAttachments[${index}].ic4proAttachedId`}
                    defaultValue={item.ic4proAttachedId || ""}
                    style={{height: "2.5rem", padding:"0"}}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId={`ic4proAttachments[${index}].ic4proAttachedBy`}>
                    
                  <Form.Control
                    type="text"
                    ref={register}
                    name={`ic4proAttachments[${index}].ic4proAttachedBy`}
                    defaultValue={item.ic4proAttachedBy || ""}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId={`ic4proAttachments[${index}].ic4proDateTime`}>
                    
                  <Form.Control
                  // type="datetime"
                  name={`ic4proAttachments[${index}].ic4proDateTime`}
                  ref={register}
                  style={{ height: '1.8rem' }}
                  defaultValue={ item.ic4proDateTime || moment().format('YYYYMMDD HH:mm ')}
                  
                />
                  </Form.Group>
                  {(mode === 'create' || mode === 'edit') && (
                  <Form.Group as={Col} style={{marginTop:'4px', maxHeight:'1.8rem'}} >
                  <Button variant="danger"  className="ml-1"  size="sm" 
                  style ={{height:'1.8rem'}} onClick={() => AttachmentsRemove(index)}>Delete</Button>
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
            type="button" onClick={AttachmentsAppend}>Add</Button>
          </Form.Group>
          )}
                        
                        </>
          </Accordion.Collapse>
        </Accordion>
         </Card>   
        </div>
    )
}

function compare(prevProps, nextProps) {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
  }
  
  export default React.memo(StepFive, compare);
