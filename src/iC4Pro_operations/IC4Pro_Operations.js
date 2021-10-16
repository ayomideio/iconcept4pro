import React, { useState, useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  Dropdown,
  Modal,
  ButtonGroup,
  Card,
} from 'react-bootstrap';
import Form from './Form';
import Table from './Table';
import HistoryModal from './Modal/HistoryModal'
import ActivityModal from './Modal/ActivityModal'
import RecordsDeleteModal from './Modal/RecordsDeleteModal'
import oprData from './Data/ic4pro_operations.json';
import { InputText } from 'primereact/inputtext';
import ExpandTable from './GroupTable/ExpandTable';

const IC4Pro_Operaions = () => {
  const [state, setState] = useState({
    data: [...oprData],
    showForm: false,
    selectedData: null,
    mode: null // Mode available: create, edit, view, delete
  });

  const [activityModal, setActivityModal] = useState(false);

  const handleActivityClose = () => setActivityModal(false);

  const [historyModal, setHistoryModal] = useState(false);

  const handleHistoryClose = () => setHistoryModal(false);

  const [recordsDeleteModal, setRecordsDeleteModal] = useState(false);

  const handleRecDelClose = () => setRecordsDeleteModal(false);

  const [expandTableModal, setExpandTableModal] = useState(false);

  const handleExpTableClose = () => setExpandTableModal(false);

  const [grouping, setGrouping] = useState(false);

  const handleGroupClose = () => setGrouping(false);

 
  const [filter, setFilter] = useState({
    globalFilter: ""
  })

  const handleForm = useCallback((event) => {
    const { name } = event.target;
    setState(prev => ({
      ...prev,
      mode: name || null,
      ...((!name || name === 'create') && { selectedData: null }),
      showForm: !prev.showForm
    }))
  }, []);

  const submitForm = useCallback((data, mode) => {
    if (mode === 'create') {
      setState(prev => ({
        ...prev,
        data: [
          data,
          ...prev.data
        ],
        selectedData: null
      }))
    }
    else if (mode === 'edit') {
      let newData = [...state.data];
      let editedDataId = newData.findIndex(dt => dt.key === data.key);
      newData[editedDataId] = data;
      setState(prev => ({
        ...prev,
        data: newData,
        selectedData: null
      }))
      console.log("Edit Data:", newData)
    }

    setState(prev => ({
      ...prev,
      showForm: false
    }))
  }, [state.data]);

  const selectData = useCallback((data) => {
    setState(prev => ({
      ...prev,
      selectedData: data
    }))
  }, []);

  const deleteData = useCallback((e) => {
    e.preventDefault();
    const { data, selectedData } = state;
    if (window.confirm('Are you sure to delete this data?')) {
      setState(prev => ({
        ...prev,
        data: [...data.filter(dt => dt.key !== selectedData.key)],
        selectedData: null,
        showForm: false,
        mode: null,
      }))
    }
  }, [state]);


  return (
    <>

      <div className="card" style={{ marginBottom: '0', border: "none" }}>
        <Row>
          <Col xs={4} >
            <div style={{ marginLeft: '0.5rem', background: "#C1C1C1", display: "inline-block", padding: "6px", paddingLeft: '2px', borderRadius: "3px" }}>
              <h5>
                Operations
                        </h5>
            </div>
            {/* <ul style={{listStyleType: 'none', padding:'0', marginTop: '0.8rem', fontSize: '1.5rem'}}>
                  {
                  location.pathname === '/' ? <></> : paths.map((path, index) => <li key={index}>{path === '' ? '' : path}</li>)
                }
              </ul> */}
                      
          </Col>
          <Col xs={8} >
            <Row >
              <div style={{ width: "5.2rem" }}></div>
                     
              <Col style={{ padding: '0' }}>
                <button type="submit" style={{ fontSize: "11px", background: "#66BB6A", color: "white", border: 'none', borderRadius: '2px' }}>
                  <i className="overview-icon pi pi-inbox" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
            Newest
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>
            
              <Col style={{ padding: '0' }}>
                <button type="submit" style={{ fontSize: "11px", background: "#42A5F5", color: "white", border: 'none', borderRadius: '2px' }}>
                  <i className="overview-icon pi pi-bookmark" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
            Totals
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col style={{ padding: '0' }}>
                <button type="submit" style={{ fontSize: "11px", background: "#F8A316", color: "white", border: 'none', borderRadius: '2px' }}
                  onClick={() => setHistoryModal(true)}>
                  <i className="overview-icon pi pi-bookmark" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
            History
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col style={{ padding: '0' }}>
                <button type="submit" style={{ fontSize: "11px", background: "#7E57C2", color: "white", border: 'none', borderRadius: '2px' }}
                  onClick={() => setActivityModal(true)}>
                  <i className="overview-icon pi pi-bookmark" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
            Activity
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col style={{ padding: '0' }}>
                <button type="submit" style={{ fontSize: "11px", background: "#E63A3A", color: "white", border: 'none', borderRadius: '2px' }}
                  onClick={() => setRecordsDeleteModal(true)} >
                  <i className="overview-icon pi pi-trash" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
            Delete
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

            
            </Row>
                    
                    
          </Col>
        </Row>
      </div>
              
      <Card style={{ border: "none" }}>
        <div className="font-weight-bold"
          style={{
            backgroundColor: "#DFF0D8", marginTop: "-1rem", marginBottom: "1rem",
            color: "black", padding: "1px", maxHeight: "1.5rem"
          }}> Record Information :
              <span style={{ color: '#787B78', fontSize: '13px' }}>
            The table below shows the following details </span></div>
              
        <Row className="mb-3" xl  >
          <Col sm={6} lg={8} xl={6}>
        
            <ButtonGroup size="sm">
              <Button
                Button
                variant="info"
                size="sm"
                name="create"
                style={{ width: '4.6rem', borderRadius: '4px', marginRight: '0.5rem', height: '2rem', padding: '2px 2px 2px 2px' }}
                onClick={handleForm}>
                <i className="pi pi-plus" style={{ 'fontSize': '1em' }}></i>
                        Create</Button>
                      
              <Button
                Button
                variant="primary"
                size="sm"
                className="ml-2"
                name="edit"
                style={{ width: '3.9rem', height: '2rem', marginRight: '0.5rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                disabled={!state.selectedData}
                onClick={handleForm}>
                <i className="pi pi-save" style={{ 'fontSize': '1em' }}></i>
                        Edit
                    </Button>
        
              <Button
                variant="success"
                size="sm"
                className="ml-1"
                name="view"
                style={{ width: '3.9rem', height: '2rem', marginRight: '0.5rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                disabled={!state.selectedData}
                onClick={handleForm}
              >
                <i className="pi pi-eye" style={{ 'fontSize': '1em' }}></i>
                    View
                    </Button>
        
                   
              <Dropdown as={ButtonGroup}
                className="ml-1  mr-3"
                style={{ padding: "0", border: 0, width: "18px" }}
              >
                <Dropdown.Toggle
                  variant="primary btn-md"
                  id="dropdown-basic"
                  style={{ backgroundColor: 'purple', height: '2rem', borderRadius: '4px', border: 0, }}>
                  More</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                        
                    size="sm"
                    className="ml-1"
                    style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                    onClick={() => setGrouping(true)}>
                    Operations Record Analytics 1
                      </Dropdown.Item>
                  <Dropdown.Item
                        
                    size="sm"
                    className="ml-1"
                    name="delete"
                    style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                    // disabled={!state.selectedData}
                    onClick={() => setExpandTableModal(true)}
                  >
                    Operations Record Analytics 2
                          </Dropdown.Item>
                        
                </Dropdown.Menu>
              </Dropdown>
        
        
                      
                      
            </ButtonGroup>
                     
                    
        
          </Col>
          <Col sm={6} lg={4} xl={3}>
                   
                    
            <div className="d-flex" style={{ marginRight: "3rem" }}>
              <i className="pi pi-search search-icon" style={{ margin: '4px 4px 0 0' }}></i>
              <InputText className="input-field"
                defaultValue={filter.globalFilter}
                style={{ width: '15rem', paddingLeft: '2rem' }}
                type="search" onInput={(e) => setFilter({ globalFilter: e.target.value })}
                placeholder="Global Search" size="50" />
            </div>
                   
          </Col>
        
          <Col className="buttonstyles">
            <Button
              size="sm"
              className="ml-1"
              style={{
                height: '2rem',
                backgroundColor: "gray",
                border: 'none'
              }}
            >
                     
              COPY
                  </Button>
            <Button
              size="sm"
              className="ml-1"
              style={{
                height: '2rem', backgroundColor: "gray",
                marginLeft: '0.5rem', border: 'none'
              }}
            >
                   
              CSV
                  </Button>
            <Button
                    
              size="sm"
              className="ml-1"
              style={{
                height: '2rem', backgroundColor: "gray",
                marginLeft: '0.5rem', border: 'none'
              }}
        
            >
                   
              EXCEL
                  </Button>
            <Button
              size="sm"
              className="ml-1"
              style={{ height: '2rem', backgroundColor: "gray", marginLeft: '0.5rem', border: 'none' }}
        
            >
                      
              PDF
                  </Button>
            <Button
              size="sm"
              className="ml-1"
              style={{ height: '2rem', backgroundColor: "gray", marginLeft: '0.5rem', border: 'none' }}
            >
        
              print
                  </Button>
          </Col>
        </Row>
        
        
        
        <Row>
          <Col>
            <Table
              data={state.data}
              selectData={selectData}
              selectedData={state.selectedData}
              filter={filter.globalFilter}
                        
            />
          </Col>
        </Row>
        

                
      </Card>
               
      <Form
        show={state.showForm}
        handleForm={handleForm}
        submitForm={submitForm}
        mode={state.mode}
        selectedData={state.selectedData}
        deleteData={deleteData}
      />
        
      <Modal
        show={historyModal}
        backdrop="static"
        keyboard={false}
        onHide={handleHistoryClose}
        dialogClassName="modal-90w"
        size='xl'
                

      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", padding: '2px' }}>
            Operations History
                  </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleHistoryClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
                  </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <HistoryModal />
        </Modal.Body>
      </Modal>
        
      <Modal
        show={activityModal}
        onHide={handleActivityClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", padding: '2px' }}>
            Operations Activity
                  </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleActivityClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
                  </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <ActivityModal />
        </Modal.Body>
      </Modal>
        
      <Modal
        show={recordsDeleteModal}
        onHide={handleRecDelClose}
        dialogClassName="modal-90w"
        size='xl'
      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", padding: '2px' }}>
            Operations Deleted
                  </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleRecDelClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
                  </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <RecordsDeleteModal />
        </Modal.Body>
      </Modal>
      <Modal
        show={expandTableModal}
        onHide={handleExpTableClose}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", display: "inline-block", padding: '2px' }}>
            Operations Record Analytics 2
              </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleExpTableClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
              </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <ExpandTable />
        </Modal.Body>
      </Modal>

      <Modal
        show={grouping}
        onHide={handleGroupClose}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", display: "inline-block", padding: '2px' }}>
            Operations Record Analytics 1
              </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleGroupClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
              </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Table
            data={state.data}
            selectData={selectData}
            selectedData={state.selectedData}
            filter={filter.globalFilter}
            grouping={grouping}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default IC4Pro_Operaions;