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
import { Editor } from 'primereact/editor';

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

const StepSix = () => {

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


    

    return (
        <div>
            <Card className="border-0">
             
           
            <Accordion defaultActiveKey="2">

            <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold" style={{
             backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
             padding: "1px", maxHeight: "1.5rem"
            }}>
            Recall
           </Accordion.Toggle>

           <Accordion.Collapse eventKey="2">
               <>
               <Row className="mt-2">
                <Col style={{ height: '3rem'}}>
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
               
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} >
                    <Form.Label column sm="3" className="mb-4 text-center">
                       
                    </Form.Label>
                    <Col sm="9">
                    
                    </Col>
                  </Form.Group>
                </Col>

                {/* <Col  style={{marginTop:"0.5rem"}}>
                  <div style={{marginLeft:"4rem"}}>
                    <fieldset className="customLegend row mt-3" style={{width:"44rem"}}>
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
                </Col> */}
               
              </Row>
              </>
            </Accordion.Collapse>
           </Accordion>

           <Accordion defaultActiveKey="2">

            <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold" style={{
             backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
             padding: "1px", maxHeight: "1.5rem"
            }}>
            Recall Message
           </Accordion.Toggle>

           <Accordion.Collapse eventKey="2">
           <>
          <Col style={{ marginTop: "0.5rem" }}>
           
          <Controller name="ic4proRecallMsg" 
            control={control} 
            rules={{ required: ' is required.' }} 
            render={({ value, onChange }) => (
              <Editor style={{ height: '320px' }}
               value={value} onTextChange={onChange}
               />
               )} 
               
               />

          
            
               </Col>

               </>
            </Accordion.Collapse>
           </Accordion>

           <Accordion defaultActiveKey="2x">

            <Accordion.Toggle as={Card.Header} eventKey="2x" className="font-weight-bold" style={{
             backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
             padding: "1px", maxHeight: "1.5rem"
            }}>
            Recall
           </Accordion.Toggle>

           <Accordion.Collapse eventKey="2x">
               <>
              
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

export default React.memo(StepSix, compare);