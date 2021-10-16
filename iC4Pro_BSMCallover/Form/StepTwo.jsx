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

const StepTwo = () => {

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

    const defaultValues = {
      ic4proMessage: '',
  }
    

    return (
        <div>
            <Card className="border-0">
             
           
            <Accordion defaultActiveKey="2">

            <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold" style={{
             backgroundColor: "#2196F3", marginTop: "0.5rem", color: "white",
             padding: "1px", maxHeight: "1.5rem"
            }}>
            Message
           </Accordion.Toggle>

           <Accordion.Collapse eventKey="2">
           <>
          <Col style={{ marginTop: "0.5rem" }}>
           
          <Controller name="ic4proMessage" 
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

            </Card>
        </div>
    )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(StepTwo, compare);
