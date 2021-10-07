import React from 'react';
import {
  useFormContext, Controller
} from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Card,
  Accordion,
} from 'react-bootstrap';
import Select from "../Shared/Select";
import Ic4proauditfield from '../../Adroit_iC4Pro_common/iC4Pro_AuditField'
import './style.css';

const CountryDetails = () => {
   
  const { control, errors, register, mode } = useFormContext();
  
  const isNumericHandler = (e) => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
    var number = Number.isInteger(parseInt(e.currentTarget.value))
    if (number !== true) {
      e.currentTarget.value = "";
    }
 }

  const handleChange = e => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  };
  
  // "ic4proPhoneCode": 234(numeric and maximum of 3 digits
  return (
    <div>
      <Card className="border-0">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "1rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}
          >
            Country Info
      </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proCountryCode">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Country Code*
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proCountryCode"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0, textTransform: "uppercase" }}
                        defaultValue=""
                        minLength="2"
                        maxLength="2"
                        onChange={handleChange}
                        disabled={mode === "view" || mode==="edit" || mode==="delete"}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proCountryName">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Country Name*
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proCountryName"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0 }}
                        defaultValue=""
                        onChange={handleChange}
                        disabled={mode === "view"  || mode === "delete"}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proCurrencyCode">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Currency Code*
                </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="ic4proCurrencyCode"
                        as={Select}
                        size="sm"
                        options={[]}
                        control={control}
                        getOptionValue={option => option}
                        getOptionLabel={option => option}
                        rules={{ required: 'Modal ID is required!' }}
                        isInvalid={errors.ic4proCurrencyCode}
                        disabled={mode === 'view' || mode === 'delete'}
                        defaultValue=""
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proPhoneCode">
                    <Form.Label column sm="3" className="text-center">
                      Phone Code
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proPhoneCode"
                        ref={register}
                        style={{ height: '1.8rem' }}
                        defaultValue=""
                        minLength="1"
                        maxLength="3"
                        onChange={isNumericHandler}
                        disabled={mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

            </>
          </Accordion.Collapse>
        </Accordion>
       
        <Accordion defaultActiveKey="3">
          <Ic4proauditfield />
        </Accordion>
               
      </Card>
    </div>
  )
}

export default CountryDetails;
