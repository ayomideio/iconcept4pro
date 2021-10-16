import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useFormContext, Controller,useFieldArray, useWatch } from "react-hook-form";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Modal
} from 'react-bootstrap';
import moment from 'moment';
import Select from "../Shared/Select";
import {Panel} from 'primereact/panel';
import { getOperation } from '../helper';
import "./styles.css";
import  "./index.css"
import  "./StepDemo.css"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import StepFour from "./StepFour"
import StepFive from "./StepFive"
import StepSix from "./StepSix"
// import StepSeven from "./StepSeven"
import StepEight from "./StepEight"
import { Steps } from 'primereact/steps';
//import coverageData from '../Data/ic4pro_zone.json'

//const { reset, ...methods } = useForm();

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const firstComponent = () => {
    return <div><StepOne /> </div>
  }
  const secondComponent = () => {
    return <div><StepTwo/></div>
  }
  const thirdComponent = () => {
    return <div><StepThree/></div>
  }
  const fourthComponent = () => {
    return <div><StepFour/></div>
  }
  const fifthComponent = () => {
    return <div><StepFive/></div>
  }
  const sixthComponent = () => {
    return <div><StepSix/></div>
  }
  // const seventhComponent = () => {
  //   return <div><StepSeven/></div>
  // }
  const finalComponent = () => {
    return <div><StepEight/></div>
  }

const Users = (navigation) => {
  const { next, go } = navigation;

    const { register, errors, control, getValues, reset, mode, selectedData, methods, datas } = useFormContext();
    const {
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
    } = datas;


   

    const handleChange = e => {
      if (e.currentTarget.value.includes(" ")) {
        e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
      }
    }

    const[attempt, setAttempt] = useState({
      no_attempt:""
    });
    
    
    function setValue1(e){
      if(e.target.validity.valid){
        setAttempt({...attempt,no_attempt:e.target.value});
      }
      
    }  

    

    const [steps, setSteps] = useState([
      { key: 'firstStep',  isDone: true, component: firstComponent, Name: 'Notification'},
      { key: 'secondStep', isDone: false, component: secondComponent, Name: 'Message' },
      { key: 'thirdStep',  isDone: false, component: thirdComponent, Name: 'Auditees'},
      { key: 'fourthStep', isDone: false, component: fourthComponent, Name: 'Auditors'},
      { key: 'fifthStep', isDone: false, component: fifthComponent, Name: 'Attachments'},
      { key: 'sixthStep', isDone: false, component: sixthComponent, Name: 'Recall'},
      // { key: 'seventhStep', isDone: false, component: seventhComponent, Name: 'Other Details'},
      { key: 'finalStep', isDone: false, component: finalComponent, Name: 'Audit Log'},
    ]);
   
    const [activeStep, setActiveStep] = useState(steps[0]);
   
    const handleNext = () => {
      if (steps[steps.length - 1].key === activeStep.key) {
        //alert('You have completed all steps.');
        return;
      }
   
      const index = steps.findIndex(x => x.key === activeStep.key);
      setSteps(prevStep => prevStep.map(x => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      }))
      setActiveStep(steps[index + 1]);
    }
   
    const handleBack = () => {
      const index = steps.findIndex(x => x.key === activeStep.key);
      if (index === 0) return;
   
      setSteps(prevStep => prevStep.map(x => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      }))
      setActiveStep(steps[index - 1]);
    }
   
    return (
        <div>
      <div className="App">
      <div className="box">
        <div className="steps">
          <ul className="nav">
            {steps.map((step, i) => {
              return <li key={i} className={`${activeStep.key === step.key ? 'active' : ''} ${step.isDone ? 'done' : ''}`}>
                 <div style={{width:"130px"}}>{`${i + 1}. ${step.Name}`} <br /></div> 
              </li>
            })}
          </ul>
        </div>
        <div className="step-component">
          {activeStep.component()}
        </div>
        <div className="btn-component">
          <input type="button" value="Back" onClick={handleBack} disabled={steps[0].key === activeStep.key}  style={{margin:"1rem",color:"black", width:"6rem",height:"2.6rem"}}/>
          <input type="button"  value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'} onClick={handleNext}  style={{height:"2.7rem",backgroundColor:"#1976D2",color:"white", width:"6rem",marginLeft:"70rem"}}/>
        </div>
      </div>
    </div>
      
    </div>
    )
}


function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(Users, compare);
