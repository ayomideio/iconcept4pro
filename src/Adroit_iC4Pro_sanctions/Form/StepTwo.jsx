import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import {
  Form,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import "./styles.css";
import { Editor } from 'primereact/editor';


const StepTwo = () => {


  // Tab 2: Sanction Reason
  // "ic4proReason": Memo[Use editor of Primereact"]

  const { register, mode } = useFormContext();
  const [text, setText] = useState('');

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  }

  const header = renderHeader();

  return (
    <div>
      <Card>
        <Col className="col-12" >
          <Card.Header
            className="font-weight-bold"
            style={{
              backgroundColor: "#2196F3",
              marginTop: "0.5rem",
              color: "white",
              padding: "1px",
              maxHeight: "1.5rem"
            }}
          >
            Sanction Reason
                 </Card.Header>


          <Form.Group as={Row} controlId="ic4proReason" className="mb-1 text-left">
            <Col sm="12">
              <Editor
                name="ic4proReason"
                style={{ height: '320px' }}
                value={text}
                onTextChange={(e) => setText(e.htmlValue)}
                headerTemplate={header}
                disabled={mode === "view"}
                ref={register}
              />
            </Col>
          </Form.Group>



        </Col>
      </Card>
    </div>
  )
}


function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(StepTwo, compare);
