import React from 'react';
import { useFormContext } from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Card,
  Accordion
} from 'react-bootstrap';
import IC4ProAuditFieldHistory from '../../Adroit_iC4Pro_common/iC4Pro_AuditField_History'
import './App.css';


const CountryHisDetails = () => {
   
  const { register, mode } = useFormContext();

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
                  <Form.Group as={Row} controlId="ic4proHistoryId">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      History ID*
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proHistoryId"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0 }}
                        defaultValue=""
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                </Col>

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
                        style={{ height: '1.8rem', marginTop: 0 }}
                        defaultValue=""
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                </Col>

              </Row>

              <Row>
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
                        disabled={mode === 'view' || mode === 'delete'}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proCurrencyCode">
                    <Form.Label column sm="3" className="text-center">
                      Currency Code
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proCurrencyCode"
                        ref={register}
                        style={{ height: '1.8rem' }}
                        defaultValue=""
                        readOnly />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proPhoneCode">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Phone Code
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proPhoneCode"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0 }}
                        defaultValue=""
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                </Col>
            
                <Col></Col>
              </Row>
          
         
            </>
          </Accordion.Collapse>
        </Accordion>
        <Accordion defaultActiveKey="3">
          <IC4ProAuditFieldHistory />
        </Accordion>
      </Card>
    </div>
  )
}

export default CountryHisDetails;

