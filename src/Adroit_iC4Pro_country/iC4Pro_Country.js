import React, {
  useState,
  useCallback,
} from 'react';
import {
  Row,
  Col,
  Button,
  Dropdown,
  ButtonGroup,
  Card,
} from 'react-bootstrap';
import Form from './Form';
import Table from './Table';
import HistoryModal from './Modal/HistoryModal'
import ActivityModal from './Modal/ActivityModal'
import RecordsDeleteModal from './Modal/RecordsDeleteModal'
import countryData from '../Data/tempData/ic4pro_countryData.json';
import { InputText } from 'primereact/inputtext';
import Distribution from './Analysis/RTN-Distribution';
import { Dialog } from 'primereact/dialog';
import ExportData from './ExportModal/iC4Pro_Exports';
import "jspdf-autotable";
import PatternDistribution from './Analysis/RTN-PatternDistribution';

const Adroit_IC4Pro_Country = () => {
  const [state, setState] = useState({
    data: [...countryData],
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

  const [patternModal, setPatternModal] = useState(false);

  const handlePatternClose = () => setPatternModal(false);

  const [grouping, setGrouping] = useState(false);

  const handleGroupClose = () => setGrouping(false);

  const [exportModal, setExportModal] = useState(false);

  const handleExportClose = () => setExportModal(false);

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
                Country
                        </h5>
            </div>
             
                      
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
                <button type="submit" style={{
                  fontSize: "11px",
                  background: "#6699cc",
                  color: "white",
                  border: 'none',
                  borderRadius: '2px'
                }}>
                  <i className="overview-icon pi pi-bookmark" style={{
                    fontSize: '1em',
                    color: "white",
                    paddingRight: "0.2em"
                  }} />
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
                  onClick={() => setRecordsDeleteModal(true)}
                disabled>
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
                    1. Classification Analysis
                      </Dropdown.Item>
                  <Dropdown.Item
                        
                    size="sm"
                    className="ml-1"
                    name="delete"
                    style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                    onClick={() => setExpandTableModal(true)}
                  >
                    2. Distribution Analysis
                          </Dropdown.Item>
                  
                  <Dropdown.Item

                    size="sm"
                    className="ml-1"
                    name="delete"
                    style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                    onClick={() => setPatternModal(true)}
                  >
                    3. Pattern and Distribution Analysis
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
        
          <Col
            className="buttonstyles"
            style={{
              position: 'absolute',
              left: '65rem'
          }}>

            <Button
              size="sm"
              className="ml-1"
              style={{
                height: '2rem',
                backgroundColor: "blue",
                marginLeft: '0.5rem',
                border: 'none',
                
              }}
              onClick={() => setExportModal(true)}
            >
        
              Export/Download
                  </Button>
          </Col>
      
        </Row>
        
        <Row>
          <Col id="table">
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
        
              

      <Dialog
        header=" Country History"
        visible={historyModal}
        onHide={handleHistoryClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <HistoryModal />
      </Dialog>

      <Dialog
        header=""
        visible={exportModal}
        onHide={handleExportClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <ExportData />
        
      </Dialog>

      <Dialog
        header=""
        visible={patternModal}
        onHide={handlePatternClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <PatternDistribution />
      </Dialog>
       
    
      <Dialog
        header=" Country Activity"
        visible={activityModal}
        onHide={handleActivityClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <ActivityModal />

      </Dialog>
        
      <Dialog
        header=" Country Deleted"
        visible={recordsDeleteModal}
        onHide={handleRecDelClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <RecordsDeleteModal />

      </Dialog>

      <Dialog
        header=" Distribution Analysis"
        visible={expandTableModal}
        onHide={handleExpTableClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <Distribution />
      </Dialog>

      <Dialog
        header=" Classification Analysis"
        visible={grouping}
        onHide={handleGroupClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <Table
          data={state.data}
          selectData={selectData}
          selectedData={state.selectedData}
          filter={filter.globalFilter}
          grouping={grouping}
        />
      </Dialog>
     
    </>
  )
}

export default Adroit_IC4Pro_Country;