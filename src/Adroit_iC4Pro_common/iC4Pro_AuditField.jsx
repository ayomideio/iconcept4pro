import { useFormContext} from "react-hook-form";
import {
    Form,
    Row,
    Col,
    Card,
} from 'react-bootstrap';
import moment from 'moment';
import { getOperation } from '../Adroit_iC4Pro_common/iC4Pro_OperationModes';


const IC4ProAuditFields = () => {

  const { register, mode} = useFormContext();
   
        return (
        <div style={{marginTop:'0.5rem'}}>
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
                      value="en"
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
                 <Row className="mt-1">
                <Col style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordDate">
                    <Form.Label column sm="3" className="text-center">
                    Record Date
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control 
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
                    value="11.20.10.1"
                    style ={{height:'1.8rem'}}
                    disabled
                      /> 
                    </Col>
                  </Form.Group>
                  </Col>
                  <Col  style={{marginTop:"0.5rem"}}>
                  <Form.Group as={Row} controlId="ic4proRecordCounter">
                    <Form.Label column sm="3" className="text-center">
                    Record Counter
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                      name="ic4proRecordCounter" 
                      ref={register}
                      style ={{height:'1.8rem'}}
                      disabled={mode === 'create' || mode === 'edit' || mode === 'view' || mode === 'delete'} />
                    </Col>
                  </Form.Group>
                  </Col>
                </Row>      
                



        </div>
    )
}

export default IC4ProAuditFields;

