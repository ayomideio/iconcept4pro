import { useFormContext} from "react-hook-form";
import {
    Form,
    Row,
    Col,
    Card,
} from 'react-bootstrap';

const IC4ProAuditFieldLog = () => {

const { register,mode} = useFormContext();
   
        return (
        <div style={{marginTop:'0.5rem'}}>

                 <Card.Header className="font-weight-bold" style={{ backgroundColor:"#2196F3", marginTop:"0.5rem",color:"white", 
                padding:"1px", maxHeight:"1.5rem"}}
                   >
                  Audit Log Details
                 </Card.Header>
                 <Row className="mt-3">
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
                  
                <Row className="mt-3">
                <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proCurrentCounter">
                    <Form.Label column sm="3" className="text-center">
                    Current Counter*
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                      type="text"
                      ref={register}
                      name="ic4proCurrentCounter"
                      defaultValue=" "
                      readOnly
                      style ={{height:'1.8rem'}}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Current Counter!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>

              <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proPreviousCounter">
                    <Form.Label column sm="3" className="text-center">
                    Prev Counter
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                      type="text"
                      name="ic4proPreviousCounter"
                      style={{ height: '1.8rem' }}
                      disabled={mode === 'view' || mode === 'delete'}
                      ref={register}
                      defaultValue=""
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Previous Counter!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>

              
                 
                </Row>

                 <Row className="mt-3">
                <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordDate">
                    <Form.Label column sm="3" className="text-center">
                    Record Date
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                       type="text"
                       name="ic4proRecordDate"
                       ref={register}
                       style ={{height:'1.8rem'}}
                      //  value={moment().format('YYYYMMDD')}
                       defaultValue=""
                       disabled
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordTime">
                    <Form.Label column sm="3" className="text-center">
                    Record Time
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
                      type="text"
                      name="ic4proRecordTime"
                      ref={register}
                      style ={{height:'1.8rem'}}
                      // value={moment().format('hh:mm:ss')}
                      defaultValue=""
                      disabled />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proWorkstation">
                    <Form.Label column sm="3" className="text-center">
                    Workstation
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="ic4proWorkstation"
                      ref={register}
                      defaultValue=""
                      disabled
                      style ={{height:'1.8rem'}}
                      />
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proPreviousStatus">
                    <Form.Label column sm="3" className="text-center">
                    Previous Status
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="ic4proPreviousStatus"
                      ref={register}
                      style ={{height:'1.8rem'}}
                      defaultValue=""
                      // defaultValue={getOperation(mode)}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proPresentStatus">
                    <Form.Label column sm="3" className="text-center">
                    Present Status
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                    type="text"
                    name="ic4proPresentStatus"
                    ref={register}
                    style ={{height:'1.8rem'}}
                    defaultValue=""
                    disabled
                      /> 
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proRelatedId">
                    <Form.Label column sm="3" className="text-center">
                    Related ID
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="ic4proRelatedId" 
                      ref={register}
                      defaultValue=""
                      style ={{height:'1.8rem'}}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row> 

                <Row className="mt-3">
                <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proRelatedApp">
                    <Form.Label column sm="3" className="text-center">
                    Related App
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                    type="text"
                    name="ic4proRelatedApp"
                    style ={{height:'1.8rem'}}
                    ref={register}
                    disabled
                    defaultValue=""
                      /> 
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proRelatedAppType">
                    <Form.Label column sm="3" className="text-center">
                    Related AppType
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      type="text"
                      name="ic4proRelatedAppType" 
                      ref={register}
                      style ={{height:'1.8rem'}}
                      defaultValue=""
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row> 

                <Row className="mt-3">
                <Col style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} controlId="ic4proOperator">
                    <Form.Label column sm="3" className="text-center">
                    Operator*
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control
                      type="text"
                      ref={register}
                      name="ic4proOperator"
                      defaultValue=""
                      readOnly
                      style ={{height:'1.8rem'}}
                      />
                       <Form.Control.Feedback type="invalid">
                    Please enter Operator!
                        </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"-1rem"}}>
                  <Form.Group as={Row} >
                    <Form.Label column sm="3" className="text-center">
                   
                    </Form.Label>
                    <Col sm="9">
                      
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>

        </div>
    )
}

export default IC4ProAuditFieldLog;

