import React from 'react';
import {
    Row,
    Col,
    Card,
  } from 'react-bootstrap';

const AppFooter = () => {

    return (

        <>
            <Card style={{ border: "0", padding: '0' }}>
                <div>
                    <Row>
                        <div style={{
                            backgroundColor: "#DFF0D8", marginTop: "-1rem", marginBottom: "1rem",
                            color: "black", padding: "1px", maxHeight: "1.5rem"
                        }}>
                            <Col>
                                <h6>Powered By: Adroit Consulting Ltd (UK) <span style={{ display: 'inline-block', width: '15rem' }}></span>
                iConcept4Pro <span style={{ display: 'inline-block', width: '3rem' }}></span>  Release: XXXXXX
                <span style={{ display: 'inline-block', width: '15rem' }}></span>  Expiry Date: dd/mm/yyyy</h6>
                            </Col>
                        </div>
           
                    </Row>
                </div>
            </Card>
        </>


    )
};




export default AppFooter;
