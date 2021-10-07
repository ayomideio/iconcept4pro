import React from 'react';
import {
  useFormContext,
  useFieldArray
} from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Accordion
} from 'react-bootstrap';
import IC4ProAuditFieldLog from '../../Adroit_iC4Pro_common/iC4Pro_AuditField_Log'
import './App.css';


const CountryActDetails = () => {
   
  const { register,control, mode} = useFormContext();
 

  const { fields,remove } = useFieldArray({
    control,
    name: 'ic4proChangeDetails',
  });
  
  return (
    <div>
      <Card className="border-0">

      <Accordion defaultActiveKey = "0">
      <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"1rem", color:"white", 
                padding:"1px", maxHeight:"1.5rem"}}
                   >
                  Country Detials
                 </Accordion.Toggle>
                 
                 <Accordion.Collapse eventKey="0">
                 <>
                 <Row className="mt-3">
                  <Col>
                  <Form.Group as={Row} controlId="userActivityId">
                    <Form.Label column sm="3" className="text-center">
                    User Activity ID*
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                       type="text"
                       name="userActivityId"
                       ref={register}
                       style={{ height: '1.8rem' }}
                       //required
                       disabled={mode === 'edit' || mode === 'view' || mode === 'delete'}
                      />
                       <Form.Control.Feedback type="invalid">
                        Please enter  userActivityId!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>

                  <Col >
                  <Form.Group as={Row} controlId="ic4proApplication">
                    <Form.Label column sm="3" className="mt-0.3  text-center">
                          Application
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control 
                       type="text"
                       name="ic4proApplication"
                       ref={register}
                       style={{ height: '1.8rem' }}
                       disabled={mode === 'edit' || mode === 'view' || mode === 'delete'}
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  
                </Row> 

              <Row className="mt-3">
              
              <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordId">
                    <Form.Label column sm="3" className="text-center">
                    Record ID*
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                      type="text"
                      name="ic4proRecordId"
                      style={{ height: '1.8rem' }}
                      disabled={mode === 'view' || mode === 'delete'}
                      ref={register}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Record ID!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>

              <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proFunction">
                    <Form.Label column sm="3" className="  text-center">
                        Function*
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                      type="text"
                      ref={register}
                      name="ic4proFunction"
                      readOnly
                      style ={{height:'1.8rem'}}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Function!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>
                 
                </Row>  

                </>
                </Accordion.Collapse>
                 
                </Accordion>

                <Row className="mb-3">
                  <Col>
                  
            <Accordion defaultActiveKey = "1">

              <Accordion.Toggle as={Card.Header} eventKey="1" className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"0.5rem",color:"white", 
              padding:"1px", maxHeight:"1.5rem"}}
                >
                Other Operations 
              </Accordion.Toggle>
                    
            <Accordion.Collapse eventKey="1">
            <>
            <Row>
              <Col md="4">
                <Form.Label>
                  Field Name
                </Form.Label>
              </Col>

              <Col md="4">
                <Form.Label>
                  Change From
                </Form.Label>
              </Col>

              <Col md="4">
                <Form.Label>
                  Change To*
                </Form.Label>
              </Col>
            </Row>
          {fields.map((item, index) => (
            <Row key={item.id} style={{marginTop:"6px"}}>
             
              <Col >
                <Row>
                  <Form.Group as={Col} md="4" controlId={`ic4proChangeDetails[${index}].ic4proFieldName`}>
                    
                    <Form.Control
                      type="text"
                      ref={register}
                      name={`ic4proChangeDetails[${index}].ic4proFieldName`}
                      //defaultValue="en"
                      readOnly
                      style ={{height:'1.8rem'}}
                      defaultValue={item.ic4proFieldName || ""}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Field Name!
                        </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId={`ic4proChangeDetails[${index}].ic4proChangeFrom`}>
                    
                    <Form.Control
                      type="text"
                      ref={register}
                      name={`ic4proChangeDetails[${index}].ic4proChangeFrom`}
                      //defaultValue="en"
                      readOnly
                      style ={{height:'1.8rem'}}
                      defaultValue={item.ic4proChangeFrom || ""}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Change From!
                        </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId={`ic4proChangeDetails[${index}].ic4proChangeTo`}>
                    
                    <Form.Control
                      type="text"
                      ref={register}
                      name={`ic4proChangeDetails[${index}].ic4proChangeTo`}
                      //defaultValue="en"
                      readOnly
                      style ={{height:'1.8rem'}}
                      defaultValue={item.ic4proChangeFrom || ""}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Change From!
                        </Form.Control.Feedback>
                  </Form.Group>
                  {(mode === 'create' || mode === 'edit') && (
                  <Form.Group as={Col} style={{marginTop:0, maxHeight:'1.8rem'}} >
                  <Button variant="danger"  className="ml-1"  size="sm" style ={{height:'1.8rem'}} onClick={() => remove(index)}>Delete</Button>
                </Form.Group>
                  )}
                </Row>
                
              </Col>
              
            </Row>
          ))}
                
                        </>
                </Accordion.Collapse>
                 
                </Accordion>     
                      </Col>
                </Row>
                
                <Accordion defaultActiveKey = "3">

          <IC4ProAuditFieldLog/>
                </Accordion>      
                </Card>
    </div>
  )
}

export default CountryActDetails;
