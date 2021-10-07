import React, { useState,useEffect} from 'react';
import { useFormContext, Controller, useWatch } from "react-hook-form";
import {
  Form,
  Row,
  Col,
  Card,
  Accordion
} from 'react-bootstrap';
import moment from 'moment';
import Select from "../Shared/Select";
import { getOperation } from '../helper';
import './App.css';

const OpeDelDetails = () => {
   
  const { register, errors, control, mode, datas} = useFormContext();
  const {
    usersJson,
    modalData,
  } = datas;
  
  


  const [ users, setUsers ] = useState([...usersJson])

  const watchKeyOfficers = useWatch({name: 'keyOfficers'});
 

  useEffect(() => {
    if(watchKeyOfficers){
      setUsers(prevUsers => {
        const newWatchKeyOfficers = watchKeyOfficers.map(ko => ko.staffName?.userid);
        const newUsers = prevUsers?.map(u => ({ ...u, isDisabled: newWatchKeyOfficers.includes(u.userid) }))
        return newUsers;
      })
    }
  }, [ watchKeyOfficers])


  
  
  return (
    <div>
    <Card className="border-0">
    <Accordion defaultActiveKey = "0">
    <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"1rem", color:"white", 
      padding:"1px", maxHeight:"1.5rem"}}
    >
      Operation Info
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
              <> 
    <Row className="mt-2">
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proOperationID">
              <Form.Label column sm="3" className="mb-4 text-center">
                Operation ID*
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="ic4proOperationID"
                  ref={register}
                  style ={{height:'1.8rem', marginTop:0}}
                  defaultValue=""
                  readOnly
                />
              </Col>
            </Form.Group>
          </Col>
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proModalId">
              <Form.Label column sm="3" className="mb-4 text-center">
                Modal ID*
              </Form.Label>
              <Col sm="9">
              <Controller
                  name="ic4proModalId"
                  as={Select}
                  size="sm"
                  options={modalData}
                  control={control}
                  getOptionValue={option => option.ic4proModalId}
                  getOptionLabel={option => option.ic4profunction}
                  rules={{ required: 'Modal ID is required!' }}
                  isInvalid={errors.ic4proModalId}
                  disabled={mode === 'view' || mode === 'delete'}
                  defaultValue=""
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proFunction">
              <Form.Label column sm="3" className="mb-4 text-center">
                Action*
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="ic4proFunction"
                  ref={register}
                  style ={{height:'1.8rem', marginTop:0}}
                  defaultValue=""
                  disabled={ mode === 'view' || mode === 'delete'} 
                />
              </Col>
            </Form.Group>
          </Col>
          <Col style={{height:'3rem'}}>
          <Form.Group as={Row} controlId="ic4proDescription">
                  <Form.Label column sm="3" className="text-center">
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                    type="text"
                    name="ic4proDescription"
                    ref={register}
                    style ={{height:'1.8rem'}}
                    defaultValue={getOperation(mode)}
                    disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                  </Col>
                </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proFunctionColor">
              <Form.Label column sm="3" className="mb-4 text-center">
                Function Color
              </Form.Label>
              <Col sm="9">
              <Form.Control
                  type="text"
                  name="ic4proFunctionColor"
                  ref={register}
                  style ={{height:'1.8rem', marginTop:0}}
                  defaultValue=""
                  disabled={ mode === 'view' || mode === 'delete'} 
                />
              </Col>
            </Form.Group>
          </Col>
          <Col style={{height:'3rem'}}>
            <Form.Group as={Row} controlId="ic4proSendOTP">
              <Form.Label column sm="4" className="mb-3 text-center">
                Send OTP
              </Form.Label>
              <Col sm="9">
              <Controller
                  name="ic4proSendOTP"
                  as={Select}
                  size="sm"
                  options={users}
                  control={control}
                  getOptionValue={option => option.otp_code}
                  getOptionLabel={option => option.otp_code}
                  rules={{ required: 'Action Color is required!' }}
                  isInvalid={errors.actionColor}
                  disabled={mode === 'view' || mode === 'delete'}
                  defaultValue=""
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
       
      </>
    </Accordion.Collapse>
    </Accordion> 

           <Accordion defaultActiveKey = "2">

                <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"0.5rem",color:"white", 
              padding:"1px", maxHeight:"1.5rem"}}
                 >
                OTP Message  
               </Accordion.Toggle>
              
               <Accordion.Collapse eventKey="2">
               <>
              
              <Row className="mt-3">
              <Col  style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proOtpMessage">
                  <Col sm="12">
                    <Form.Control
                    as="textarea"
                    rows="5"
                   // ref={register}
                    name="ic4proOtpMessage"
                    ref={register}
                    placeholder="OTP Message..."
                    disabled={mode === 'view' || mode === 'delete'}
                    />
                  </Col>
                </Form.Group>
                </Col>

                
              </Row>

              </>
              </Accordion.Collapse>
              </Accordion>   
              
      <Card.Header className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"0.5rem",color:"white", 
              padding:"1px", maxHeight:"1.5rem"}}
                 >
                Audit Log Details
               </Card.Header>

               <Row className="mt-1">
            <Col style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proLanguage">
                  <Form.Label column sm="3" className="text-center">
                  Language*
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control 
                    type="text"
                    name="ic4proLanguage"
                    style={{ height: '1.8rem' }}
                    disabled={mode === 'view' || mode === 'delete'}
                    ref={register}
                    defaultValue="en"
                    />
                     <Form.Control.Feedback type="invalid">
                  Please enter Language!
                      </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                </Col>

            <Col style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proUserLocation">
                  <Form.Label column sm="3" className="text-center">
                   User Location*
                  </Form.Label>
                  <Col sm="9">
                  <Form.Control
                    type="text"
                    //ref={register}
                    name="ic4proUserLocation"
                    defaultValue="Branch001"
                    readOnly
                    style ={{height:'1.8rem'}}
                    />
                     <Form.Control.Feedback type="invalid">
                  Please enter Current User Location!
                      </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                </Col>
               
              </Row>
               <Row className="mt-1">
              <Col style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proRecordDate">
                  <Form.Label column sm="3" className="text-center">
                  Record Date
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control 
                     // type="text"
                     name="ic4proRecordDate"
                     ref={register}
                     style ={{height:'1.8rem'}}
                     value={moment().format('YYYYMMDD')}
                     disabled
                    />
                  </Col>
                </Form.Group>
                </Col>
                <Col style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proRecordTime">
                  <Form.Label column sm="3" className="text-center">
                  Record Time
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control 
                    //type="text"
                    name="ic4proRecordTime"
                    ref={register}
                    style ={{height:'1.8rem'}}
                    value={moment().format('hh:mm:ss')}
                    disabled />
                  </Col>
                </Form.Group>
                </Col>
              </Row>
              <Row className="mt-1">
              <Col  style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proOperator">
                  <Form.Label column sm="3" className="text-center">
                  Operator
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                    type="text"
                    name="ic4proOperator"
                    defaultValue="adroit"
                    disabled
                    style ={{height:'1.8rem'}}
                    />
                  </Col>
                </Form.Group>
                </Col>
                <Col  style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proOperation">
                  <Form.Label column sm="3" className="text-center">
                  Operation
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                    //type="text"
                    name="ic4proOperation"
                    ref={register}
                    style ={{height:'1.8rem'}}
                    defaultValue={getOperation(mode)}
                    disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                  </Col>
                </Form.Group>
                </Col>
              </Row>
              <Row className="mt-1">
              <Col  style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proWorkstation">
                  <Form.Label column sm="3" className="text-center">
                  Workstation
                  </Form.Label>
                  <Col sm="9">
                  <Form.Control
                  type="text"
                  name="ic4proWorkstation"
                  style ={{height:'1.8rem'}}
                  disabled
                    /> 
                  </Col>
                </Form.Group>
                </Col>
                <Col  style={{marginTop:"0.5rem"}}>
                <Form.Group as={Row} controlId="ic4proRecordCounter">
                  <Form.Label column sm="3" className="text-center">
                  No. Counter
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                    // type="text"
                    name="ic4proRecordCounter" 
                    ref={register}
                    style ={{height:'1.8rem'}}
                    disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                  </Col>
                </Form.Group>
                </Col>
              </Row>      
              </Card>
  </div>
  )
}

export default OpeDelDetails;
