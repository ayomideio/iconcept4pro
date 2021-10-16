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

const StepSeven = () => {

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
              <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proPreparer">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Preparer
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proPreparer"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proPreparerRole">
                    <Form.Label column sm="3" className="mb-4 text-center">
                    Preparer Role
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proPreparerRole"
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
                  <Form.Group as={Row} controlId="ic4proFaintStatus">
                    <Form.Label column sm="3" className="mb-4 text-center">
                    Faint Status
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proFaintStatus"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proAims">
                    <Form.Label column sm="3" className="mb-4 text-center">
                    Aims
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proAims"
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
                  <Form.Group as={Row} controlId="ic4proAimsStatus">
                    <Form.Label column sm="3" className="mb-4 text-center">
                    Aims Status
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proAimsStatus"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proPublishFlag">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Publish Flag
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proPublishFlag"
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
                  <Form.Group as={Row} controlId="ic4proPublishDate">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Publish Date
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proPublishDate"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proPublisher">
                    <Form.Label column sm="3" className="mb-4 text-center">
                        Publisher
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proPublisher"
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
                  <Form.Group as={Row} controlId="ic4proBuildFlag">
                    <Form.Label column sm="3" className="mb-4 text-center">
                       Build Flag
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proBuildFlag"
                        ref={register}
                        defaultValue=""
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proBuildDate">
                    <Form.Label column sm="3" className="mb-4 text-center">
                        Build Date
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proBuildDate"
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
                  <Form.Group as={Row} controlId="ic4proBuilder">
                    <Form.Label column sm="3" className="mb-4 text-center">
                       Builder
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                        type="text"
                        name="ic4proBuilder"
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

            </Card>
        </div>
    )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(StepSeven, compare);