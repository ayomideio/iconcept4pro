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

const StepFour = () => {

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

    const { fields: TeamMembersFields, append: TeamMembersAppend, remove: TeamMembersRemove } = useFieldArray({
        control,
        name: 'ic4proTeamMembers',
      });
    
      const watchTeamMembers = useWatch({ name: 'ic4proTeamMembers' });
      const preWatchTeamMembers = usePrevious(watchTeamMembers)
    
      useEffect(() => {
        if (watchTeamMembers && !compare(watchTeamMembers, preWatchTeamMembers)) {
          setUsers(prevTeamMembers => {
            const newWatchTeamMembers = watchTeamMembers.map(ko => ko.ic4proMember?.userid);
            const newTeamMembers = prevTeamMembers?.map(u => ({ ...u, isDisabled: newWatchTeamMembers.includes(u.userid) }))
            return newTeamMembers;
          })
        }
      }, [watchTeamMembers, preWatchTeamMembers, users])

      const watchIc4proTeamLeader = useWatch({ name: 'ic4proTeamLeader' });
    
      const getMember = useCallback((ic4proMemberLevel) => {
        const memberFind = usersJson.find(ur => ur.gradelevel === ic4proMemberLevel)
        return memberFind?.gradelevel;
      }, []);

      const getLevel = useCallback((gradelevel) => {
        const levelFind = users.find(de => de.gradelevel === gradelevel)
        return levelFind?.gradelevel;
      }, []);

    return (
        <div>
         <Card className="border-0">
        <Accordion defaultActiveKey="4">
          <Accordion.Toggle as={Card.Header} eventKey="4" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Office Auditors Team Leader
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
              </>
          </Accordion.Collapse>
        </Accordion>
              <Accordion defaultActiveKey="4x">
                <Accordion.Toggle as={Card.Header} eventKey="4x" className="font-weight-bold" style={{
                  backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
                  padding: "1px", maxHeight: "1.5rem"
                }}>
                 Office Auditors Team Member
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4x">
                 <>
                {TeamMembersFields.map((item, index) => (
                  <>
                    <Row key={item.id} className="mt-2">
                      <Col style={{ height: '3rem' }}>
                        <Form.Group as={Row} controlId={`ic4proTeamMembers[${index}].ic4proMember`}>
                          <Form.Label column sm="3" className="mb-4 text-center">
                            Member
                          </Form.Label>
                          <Col sm="9">
                            <Controller
                              name={`ic4proTeamMembers[${index}].ic4proTeamMember`}
                              as={Select}
                              options={users}
                              control={control}
                              getOptionValue={option => option.userid}
                              getOptionLabel={option => option.fullName}
                              placeholder="Members  ..."
                              rules={{ required: 'Members is required!' }}
                              isInvalid={errors.ic4proTeamMembers?.[index]?.ic4proMember}
                              disabled={mode === 'view' || mode === 'delete'}
                              defaultValue={item.ic4proMember || ""}
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
                              defaultValue={getMember(watchTeamMembers?.[index]?.ic4proMember?.gradelevel)}
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

            
          </Accordion.Collapse>
        </Accordion>
         </Card>   
        </div>
    )
}

function compare(prevProps, nextProps) {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
  }
  
  export default React.memo(StepFour, compare);
