import React from 'react';
import { useFormContext } from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Card,
  Accordion
} from 'react-bootstrap';
import './App.css';
import IC4ProAuditFieldDelete from '../../Adroit_iC4Pro_common/iC4Pro_AuditField_Delete';


const RegulatorDelDetails = () => {
   
  const { register} = useFormContext();
  
 

  return (
    <div>
    <Card className="border-0">
    <Accordion defaultActiveKey = "0">
    <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"1rem", color:"white", 
      padding:"1px", maxHeight:"1.5rem"}}
    >
      Regulator Info
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
              <> 
    <Row className="mt-2">
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proRegulatorCode">
              <Form.Label column sm="3" className="mb-4 text-center">
                Regulator Code*
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="ic4proRegulatorCode"
                  ref={register}
                  style ={{height:'1.8rem', marginTop:0}}
                  defaultValue=""
                  readOnly
                />
              </Col>
            </Form.Group>
          </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proRegulatorName">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Regulator Name*
              </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proRegulatorName"
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
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proYearOfEstablish">
              <Form.Label column sm="3" className="mb-4 text-center">
                Year Of Establish*
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="ic4proYearOfEstablish"
                  ref={register}
                  style ={{height:'1.8rem', marginTop:0}}
                  defaultValue=""
                 readOnly 
                />
              </Col>
            </Form.Group>
          </Col>
          <Col style={{height:'3rem'}}>
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
                    <Form.Label column sm="3" className="text-center">
                      URL
                  </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proUrl"
                        ref={register}
                        style={{ height: '1.8rem' }}
                        defaultValue=""
                        readOnly />
                    </Col>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
       
      </>
    </Accordion.Collapse>
        </Accordion> 
        

        <Accordion defaultActiveKey="0" style={{ marginBottom: '8rem' }}>
          <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "1rem", color: "white",
            padding: "1px", maxHeight: "1.5rem",
          }}
          >
            Mission
      </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>

                  <Form.Group as={Row} controlId="ic4proMission">
                    <Col sm="12">
                      <Form.Control
                        as="textarea"
                        //row="3"
                        style={{ height: 150, width: 1200 }}
                        name="ic4proMission"
                        ref={register}
                        defaultValue=""
                        readOnly
                      />
                    </Col>

                  </Form.Group>

                </Col>

              </Row>

            </>
          </Accordion.Collapse>
        </Accordion>



        <Accordion defaultActiveKey="0" style={{ marginBottom: '8rem' }}>
          <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{
            backgroundColor: "#2196F3", marginTop: "1rem", color: "white",
            padding: "1px", maxHeight: "1.5rem"
          }}
          >
            Objective
      </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <>
              <Row className="mt-2">
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proObjective">

                    <Col sm="12">
                      <Form.Control
                        as="textarea"
                        //row="3"
                        style={{ height: 150, width: 1200 }}
                        name="ic4proObjective"
                        ref={register}
                        defaultValue=""
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                </Col>

              </Row>

            </>
          </Accordion.Collapse>
        </Accordion>



        <Accordion defaultActiveKey="3">
          <IC4ProAuditFieldDelete />
        </Accordion>    
      </Card>
  </div>
  )
}

export default RegulatorDelDetails;
