import React, { useState } from 'react';
import "./styles.css";
import "./index.css"
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from './StepThree';




const firstComponent = () => {
  return <div><StepOne /> </div>
}
const secondComponent = () => {
  return <div><StepTwo /></div>
}
const thirdComponent = () => {
  return <div><StepThree /></div>
}


const Users = () => {

  const [steps, setSteps] = useState([
    { key: 'firstStep', isDone: true, component: firstComponent },
    { key: 'secondStep', isDone: false, component: secondComponent },
    { key: 'thirdStep', isDone: false, component: thirdComponent },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
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
                  <div>Step {i + 1}<br /></div>
                </li>
              })}
            </ul>
          </div>
          <div className="step-component">
            {activeStep.component()}
          </div>
          <div className="btn-component">
            <input type="button" value="Back" onClick={handleBack} disabled={steps[0].key === activeStep.key} style={{ margin: "1rem", color: "black", width: "6rem", height: "2.6rem" }} />
            <input type="button" value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'} onClick={handleNext} style={{ height: "2.7rem", backgroundColor: "#1976D2", color: "white", width: "6rem", marginLeft: "70rem" }} />
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
