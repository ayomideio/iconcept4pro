import React, { useState, useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  Card,
} from 'react-bootstrap';
import FormActivty from '../FormActivty';
import ActivityTable from '../ActivtyTable';
import userActivityData from '../../Data/tempData/ic4pro_userActivity.json';
import { InputText } from 'primereact/inputtext';
import DistributionActivity from '../Analysis/RTN-DistributionActivity';
import { Dialog } from 'primereact/dialog';
import ExportDataActivity from '../ExportModal/iC4Pro_ExportsActivity';
import PatternDisActivity from '../Analysis/RTN-PatternDistributionActivity';
import DisActivityLastSevDay from '../Analysis/RTN-DistributionActivityLast7Day';
import DisActivityLastThiMonth from '../Analysis/RTN-DistributionActivityLast30Day';
import DisActivityOneYear from '../Analysis/RTN-DistributionActivityLastOneYear';
import DisActivityOtherYears from '../Analysis/RTN-DistributionActivityOtherYears';



const ActivityModal = () => {
  const [state, setState] = useState({
    data: [...userActivityData],
    showForm: false,
    selectedData: null,
    mode: null // Mode available: create, edit, view, delete
  });

  const [grouping, setGrouping] = useState(false);
  const [expandTableModal, setExpandTableModal] = useState(false);
  const handleExpTableClose = () => setExpandTableModal(false);

  const [patternDisAct, setPatternDisAct] = useState(false);
  const handlePatternDisClose = () => setPatternDisAct(false);

  const [exportDataActivity, setExportDataActivity] = useState(false);
  const handleExportDataClose = () => setExportDataActivity(false);

  const [disActivitySev, setDisActivitySev] = useState(false);
  const handleDisActSevenClose = () => setDisActivitySev(false);

  const [disActivityThirty, setDisActivityThirty] = useState(false);
  const handleDisActThirtyClose = () => setDisActivityThirty(false);

  const [disActOneYear, setDisActOneYear] = useState(false);
  const handleActOneYearClose = () => setDisActOneYear(false);

  const [disActOtherYear, setDisActOtherYear] = useState(false);
  const handleDisActOtherYearClose = () => setDisActOtherYear(false);


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

      <Card style={{ border: "none" }}>
        <Row>
          <Col xs={6}>
            <div style={{ background: "#C1C1C1", display: "inline-block", padding: "6px", borderRadius: "3px" }}>
              <h5>
                Regulator Activity
                </h5>
            </div>


          </Col>

          <Col xs={6} >

            <Row >

              <Col>
                <button
                  type="submit"
                  style={{
                    fontSize: "11px",
                    background: "#7E57C2", color: "white",
                    border: 'none', borderRadius: '2px'
                  }}
                  onClick={() => setDisActivitySev(true)}>
                  <i className="overview-icon pi pi-calendar" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
              Last 7 Day
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button type="submit" style={{
                  fontSize: "11px",
                  background: "#7E57C2", color: "white", border: 'none', borderRadius: '2px'
                }}
                  onClick={() => setDisActivityThirty(true)}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
              Last 30 Day
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button type="submit" style={{
                  fontSize: "11px",
                  background: "#7E57C2", color: "white",
                  border: 'none', borderRadius: '2px'
                }}
                  onClick={() => setDisActOneYear(true)}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
              Last 1 Year
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button type="submit" style={{
                  fontSize: "11px",
                  background: "#7E57C2",
                  color: "white",
                  border: 'none',
                  borderRadius: '2px'
                }}
                  onClick={() => setDisActOtherYear(true)}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
            Other Years
            <br />
                  <small style={{
                    fontSize: "9px",
                    marginLeft: '8px',
                    marginTop: '0.006em',
                    color: "white",
                    padding: "0"
                  }}>Record Assigned</small>
                </button>
              </Col>


              <Col>
                <button type="submit" style={{
                  fontSize: "11px",
                  background: "#6699cc",
                  color: "white",
                  border: 'none',
                  borderRadius: '12px',
                  height: '2.3rem'
                }}>
                  Analytics
                  <br />
                </button>
              </Col>




            </Row>
          </Col>

        </Row>
      </Card>

      <Card style={{ border: "none", marginTop: '-2rem' }}>
        <div className="font-weight-bold"
          style={{
            backgroundColor: "#DFF0D8", marginTop: "-1rem", marginBottom: "1rem",
            color: "black", padding: "1px", maxHeight: "1.5rem"
          }}> Record Information :
          <span style={{ color: '#787B78', fontSize: '13px' }}>
            The table below shows the following details </span></div>

        <Row className="mb-3" xl  >
          <Col sm={3} lg={8} xl={4}>

            <ButtonGroup size="sm">

              <Button
                variant="success"
                size="sm"
                className="ml-1"
                name="view"
                style={{ width: '3.9rem', height: '2rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                disabled={!state.selectedData}
                onClick={handleForm}
              >
                <i className="pi pi-eye" style={{ 'fontSize': '1em' }}></i>
                    View
                    </Button>

              <Button
                size="sm"
                className="ml-1"
                name="view"
                style={{
                  width: 'auto',
                  height: '2rem',
                  borderRadius: '17px',
                  padding: '2px 2px 2px 2px',
                  border: '0',
                  background: '#237163'
                }}
                onClick={() => setGrouping(true)}
              >
                Classification
                    </Button>


              <Button
                size="sm"
                className="ml-1"
                name="view"
                style={{
                  width: 'auto',
                  height: '2rem',
                  borderRadius: '17px',
                  padding: '2px 2px 2px 2px',
                  border: 0,
                  background: '#7e2506'
                }}
                onClick={() => setExpandTableModal(true)}
              >
                Distribution
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
                    name="delete"
                    style={{
                      height: '2.1rem',
                      borderRadius: '4px',
                      padding: '2px 2px 2px 2px'
                    }}
                    onClick={() => setPatternDisAct(true)}
                  >
                    1. Pattern and Distribution Analysis
                          </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>




            </ButtonGroup>




          </Col>

          <Col sm={6} lg={4} xl={5}>


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
              left: '74.5rem'
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
              onClick={() => setExportDataActivity(true)}
            >

              Export/Download
                  </Button>
          </Col>


        </Row>


        <Row>            <Col>
          <ActivityTable
            data={state.data}
            selectData={selectData}
            selectedData={state.selectedData}
            filter={filter.globalFilter}
            grouping={grouping}
          />
        </Col>


        </Row>

        {/* </Card.Body> */}

      </Card>

      <FormActivty
        show={state.showForm}
        handleForm={handleForm}
        submitForm={submitForm}
        mode={state.mode}
        selectedData={state.selectedData}
        deleteData={deleteData}
      />


      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Classification Analysis</span>}
        visible={expandTableModal}
        onHide={handleExpTableClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DistributionActivity />
      </Dialog>


      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Pattern Distribution</span>}
        visible={patternDisAct}
        onHide={handlePatternDisClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <PatternDisActivity />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Export Data</span>}
        visible={exportDataActivity}
        onHide={handleExportDataClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <ExportDataActivity />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Last 7 Day</span>}
        visible={disActivitySev}
        onHide={handleDisActSevenClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisActivityLastSevDay />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Last 30 Day</span>}
        visible={disActivityThirty}
        onHide={handleDisActThirtyClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisActivityLastThiMonth />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Last 1 Year</span>}
        visible={disActOneYear}
        onHide={handleActOneYearClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisActivityOneYear />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Other Years</span>}
        visible={disActOtherYear}
        onHide={handleDisActOtherYearClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisActivityOtherYears />
      </Dialog>
      

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Distribution Analysis</span>}
        visible={grouping}
        onHide={handleGroupClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <ActivityTable
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

export default ActivityModal;