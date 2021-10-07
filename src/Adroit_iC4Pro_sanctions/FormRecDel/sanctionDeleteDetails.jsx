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


const LanguageDelDetails = () => {
   
  const { register, mode} = useFormContext();
  
  

  return (
    <div>
    <Card className="border-0">
    <Accordion defaultActiveKey = "0">
    <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"1rem", color:"white", 
      padding:"1px", maxHeight:"1.5rem"}}
    >
      Language Info
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
              <> 
    <Row className="mt-2">
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proLanguageId">
              <Form.Label column sm="3" className="mb-4 text-center">
                Language ID*
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="ic4proLanguageId"
                  ref={register}
                  style ={{height:'1.8rem', marginTop:0}}
                  defaultValue=""
                  readOnly
                />
              </Col>
            </Form.Group>
          </Col>
                <Col style={{ height: '3rem' }}>
                  <Form.Group as={Row} controlId="ic4proLanguageName">
                    <Form.Label column sm="3" className="mb-4 text-center">
                      Language Name*
              </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proLanguageName"
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
            <Form.Group as={Row} controlId="ic4proLanguageNativeName">
              <Form.Label column sm="3" className="mb-4 text-center">
                Native Name*
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="ic4proLanguageNativeName"
                  ref={register}
                  style ={{height:'1.8rem', marginTop:0}}
                  defaultValue=""
                  disabled={ mode === 'view' || mode === 'delete'} 
                />
              </Col>
            </Form.Group>
          </Col>
          <Col style={{height:'3rem'}}>
          <Form.Group as={Row} controlId="ic4proInstalledDate">
                  <Form.Label column sm="3" className="text-center">
                    Installed Date
                  </Form.Label>
                  <Col sm="9">
                      <Form.Control
                        type="text"
                        name="ic4proInstalledDate"
                        ref={register}
                        style={{ height: '1.8rem' }}
                        defaultValue=""
                        readOnly />
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

export default LanguageDelDetails;
