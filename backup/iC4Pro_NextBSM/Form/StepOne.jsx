import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Hint } from 'react-autocomplete-hint';
import { useFormContext, Controller, useFieldArray, useWatch } from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
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
  
const StepOne = () => {

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
      reasonData,
      departData,
      overdueTimeData,
      operationData,
      statusColorsData
    } = datas;


    const handleChange = e => {
        if (e.currentTarget.value.includes(" ")) {
          e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
        }
      };
    const [text, setText] = React.useState();

    const { fields: concatFields, append: concatAppend, remove: concatRemove } = useFieldArray({
      control,
      name: 'ic4proOtherScopes',
    });

    

    const [ concats, setConcats] = useState([...concatData])

    const watchOtherScopes = useWatch({ name: 'ic4proOtherScopes' });
    const prevWatchOtherScopes = usePrevious(watchOtherScopes)
  // const preWatchKeyOfficers = usePrevious(watchKeyOfficers)

  

  useEffect(() => {
    if (watchOtherScopes && !compare(watchOtherScopes, prevWatchOtherScopes)) {
      setConcats(prevOtherScopes => {
        const newWatchOtherScopes = watchOtherScopes.map(ko => ko.ic4proOtherScope?.ic4proConcatId);
        const newOtherScopes = prevOtherScopes?.map(u => ({ ...u, isDisabled: newWatchOtherScopes.includes(u.ic4proConcatId) }))
        return newOtherScopes;
      })
    }
  }, [watchOtherScopes, prevWatchOtherScopes, concats])

  const watchIc4proScope = useWatch({ name: 'ic4proScope' });

  const getLocation = useCallback((ic4proConcatId) => {
    const locationFind = concatData.find(cd => cd.ic4proConcatId === ic4proConcatId)
    return locationFind?.ic4proConcatId;
  }, []);


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
                  <Form.Group as={Row} controlId="ic4proFaintId">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      FAINT ID*
                    </Form.Label>
                    <Col sm="9">
                    <OverlayTrigger
                      key="Faintid"
                      placement="bottom"
                      overlay={
                      <Tooltip id={`tooltip`}>
                        Enter your <strong>FAINT ID</strong>.
                      </Tooltip>
                      }>
    
                      <Form.Control
                        type="text"
                        name="ic4proFaintId"
                        ref={register}
                        defaultValue={`FAINT-${moment().format('YYYYMMDD-HHmmss')}`}
                        disabled
                      />
                      </OverlayTrigger>
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
                        disabled={mode === 'view' || mode === 'delete'}
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
                    <Form.Label column sm="6" className="mb-4 text-center">
                      Audit Date From*
                    </Form.Label>
                    <Col sm="5">
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
                    <Form.Label column sm="6" className="mb-4 text-center">
                       To*
                    </Form.Label>
                    <Col sm="6">
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
              
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proVisitDateFrom">
                    <Form.Label column sm="6" className="mb-4 text-center">
                      Visit Date From*
                    </Form.Label>
                    <Col sm="5">
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
                    <Form.Label column sm="6" className="mb-4 text-center">
                      To*
                    </Form.Label>
                    <Col sm="6">
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
                
              </Row>

            
            </>
          </Accordion.Collapse>
        </Accordion>

        <Accordion defaultActiveKey="1">
          <Accordion.Toggle as={Card.Header} eventKey="1" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "1rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Notification and Reason
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <>
            <Col className="mt-3" style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proNotification">
                    <Form.Label column sm="1" className="mb-4 text-center">
                      Notification
                    </Form.Label>
                    <Col sm="11">
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
                <Col className="mt-2" style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proReason">
                    <Form.Label column sm="1" className="mb-4 text-center">
                      Reason
                    </Form.Label>
                    <Col sm="11">
                    <Controller
                        name="ic4proReason"
                        as={Select}
                        size="sm"
                        options={reasonData}
                        control={control}
                        getOptionValue={option => option.ic4proReasonId}
                        getOptionLabel={option => option.ic4proReason}
                        rules={{ required: 'Location is required!' }}
                        isInvalid={errors.ic4proReason}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
                 
            </>
          </Accordion.Collapse>
        </Accordion>

        {/* <Accordion defaultActiveKey="2">
          <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "1rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}>
            Main Location/Scope
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <>
               
            
                
                <Col className="mt-3" style={{ height: '3rem' }}>
                <Form.Group as={Row} controlId="ic4proScope">
                    <Form.Label column sm="1" className="mb-4 text-center">
                      Scope
                    </Form.Label>
                    <Col sm="11">
                    <Controller
                        name="ic4proScope"
                        as={Select}
                        size="sm"
                        options={concatData}
                        control={control}
                        getOptionValue={option => option.ic4proConcatId}
                        getOptionLabel={option => option.ic4proDetails}
                        rules={{ required: 'Scope is required!' }}
                        isInvalid={errors.ic4proScope}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>
              
            </>
          </Accordion.Collapse>
        </Accordion> */}

        <Accordion defaultActiveKey="3">

<Accordion.Toggle as={Card.Header} eventKey="3" className="font-weight-bold" style={{
 backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
 padding: "1px", maxHeight: "1.5rem"
}}>
Other Locations
</Accordion.Toggle>

<Accordion.Collapse eventKey="3">
<>
    {concatFields.map((item, index) => (
      <>
        <Row key={item.id} className="mt-2">
          <Col style={{ height: '3rem' }}>
            <Form.Group as={Row} controlId={`ic4proOtherScopes[${index}].ic4proOtherScope`}>
              <Form.Label column sm="3" className="mb-4 text-center">
              Other Scope
              </Form.Label>
              <Col sm="7">
                <Controller
                  name={`ic4proOtherScopes[${index}].ic4proOtherScope`}
                  as={Select}
                  options={concats}
                  control={control}
                  getOptionValue={option => option.ic4proConcatId}
                  getOptionLabel={option => option.ic4proDetails}
                  placeholder="Other Scope  ..."
                  rules={{ required: 'Other Scope is required!' }}
                  isInvalid={errors.ic4proOtherScopes?.[index]?.ic4proOtherScope}
                  disabled={mode === 'view' || mode === 'delete'}
                  defaultValue={item.ic4proOtherScope || ""}
                />
              </Col>
              {(mode === 'create' || mode === 'edit') && (
                         <Form.Group as={Col} style={{ marginTop: '4px', maxHeight: '1.8rem' }} >
                            <Button variant="danger" className="ml-1" size="sm" style={{ height: '1.8rem' }} onClick={() => concatRemove(index)}>Delete</Button>
                         </Form.Group>
                          )}
            </Form.Group>
          </Col>
          <Col style={{ height: '3rem' }}>
            <Form.Group as={Row} >
              <Form.Label column sm="3"  className="mb-4 text-center">
               
              </Form.Label>
                    <Col sm="7">
                
                     </Col>
                      
                          </Form.Group>
                       </Col>
                     </Row>
                    </>
                   ))}
                   {(mode === 'create' || mode === 'edit') && (
                    <Form.Group>
                      <Button variant="success" size="sm"
                         style={{ maxWidth: '4rem', maxHeight: '1.8rem', marginLeft: '1rem', marginTop: '0.5rem' }}
                         type="button" onClick={concatAppend}>Add</Button>
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

export default React.memo(StepOne, compare);
