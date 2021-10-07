import React, { Fragment } from 'react';
import ReactSelect from 'react-select';

const styles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '30px',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px'
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',
  }),
  
}

const Select = ({ disabled, ...props}) => (
  <Fragment>
    <ReactSelect styles={styles}  isDisabled={disabled} {...props} />
    
    {props.isInvalid && (
      <div className="custom-input-error" >
        {props.isInvalid.message}
      </div>
    )}
  </Fragment>
);

export default Select;