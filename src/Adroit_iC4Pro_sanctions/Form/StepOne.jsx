import React from 'react';
import {
  useFormContext
} from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Card,
  Accordion
} from 'react-bootstrap';
import Ic4proauditfield from '../../Adroit_iC4Pro_common/iC4Pro_AuditField'
import './style.css';

const SanctionDetails = () => {

  const { register, mode } = useFormContext();



  const handleChange = e => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  };


  return (
    <div>
      <Card className="border-0">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "1rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}
          >
            Sanction Info
      </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proSanctionCode">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Sanction Code*
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proSanctionCode"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0, textTransform: "lowercase" }}
                        defaultValue=""
                        minLength="2"
                        maxLength="2"
                        onChange={handleChange}
                        disabled={mode === "view" || mode === "edit" || mode === "delete"}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proSanctionDesc">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Description*
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proSanctionDesc"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0 }}
                        defaultValue=""
                        onChange={handleChange}
                        disabled={mode === "view" || mode === "delete"}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proYearOfEstablish">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Year of Establish*
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proYearOfEstablish"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0 }}
                        defaultValue=""
                        disabled={mode === 'view' || mode === 'delete'}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proCountryDomicile">
                    <Form.Label column sm="3" className="text-center">
                      Country Domicile
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proCountryDomicile"
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
                  <Form.Group as={Row} controlId="ic4proUrl">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      URL*
                </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proUrl"
                        ref={register}
                        style={{ height: '1.8rem', marginTop: 0 }}
                        defaultValue=""
                        disabled={mode === 'view' || mode === 'delete'}
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
          <Ic4proauditfield />
        </Accordion>

      </Card>
    </div>
  )
}

export default SanctionDetails;