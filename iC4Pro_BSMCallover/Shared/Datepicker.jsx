import React, { Fragment} from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import "./style.css";

const Datepicker = (props) => (
  <Fragment>
    <ReactDatePicker
      {...props}
      className={`form-control ${props.isInvalid && 'is-invalid'}`}
    />
    {props.isInvalid && (
      <div className="custom-input-error">
        {props.isInvalid.message}
      </div>
    )}
  </Fragment>
)

export default Datepicker;