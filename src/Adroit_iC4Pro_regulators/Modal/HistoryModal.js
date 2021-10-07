import React, { useState, useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  Dropdown
} from 'react-bootstrap';
import FormHistory from '../FormHistory';
import HistoryTable from '../HistoryTable';
import HisData from '../../Data/tempData/ic4pro_regulatorDataHis.json';
import { InputText } from 'primereact/inputtext';
import DistributionTableHistory from '../Analysis/RTN-DistributionHistory';
import { Dialog } from 'primereact/dialog';
import ExportDataHistory from '../ExportModal/iC4Pro_ExportsHistory'
import PatternDistributionHistory from '../Analysis/RTN-PatternDistributionHistory';
import DisHistoryLastSevDay from '../Analysis/RTN-DistributionHistoryLastSevDay';
import DisHistoryLastThiMonth from '../Analysis/RTN-DistributionHistoryLastThirtyDay';
import DisHistoryOneYear from '../Analysis/RTN-DistributionHistoryLastOneYear';
import DisHistoryOtherYears from '../Analysis/RTN-DistributionHistoryOtherYears';




const HistoryModal = () => {
  const [state, setState] = useState({
    data: [...HisData],
    showForm: false,
    selectedData: null,
    mode: null // Mode available: create, edit, view, delete
  });

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


  const [disHisSev, setDisHisSev] = useState(false);
  const handleDisHisSevenClose = () => setDisHisSev(false);

  const [disHisThirty, setDisHisThirty] = useState(false);
  const handleDisHisThirtyClose = () => setDisHisThirty(false);

  const [disHisOneYear, setDisHisOneYear] = useState(false);
  const handleHisOneYearClose = () => setDisHisOneYear(false);

  const [disHisOtherYear, setDisHisOtherYear] = useState(false);
  const handleDisHisOtherYearClose = () => setDisHisOtherYear(false);


  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [patternDistribution, setPatternDistribution] = useState(false);
  const [displayHistoryExport, setDisplayHistoryExport] = useState(false);
  const [grouping, setGrouping] = useState(false);

  const dialogFuncMap = {
    'displayResponsive': setDisplayResponsive,
    'displayHistoryExport': setDisplayHistoryExport,
    'PatternDistribution': setPatternDistribution,
    'grouping': setGrouping,
  }

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);


  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }



  return (
    <>

      <Card style={{ border: "none" }}>
        <Row>
          <Col xs={6}>
            <div style={{ background: "#C1C1C1", display: "inline-block", padding: "6px", borderRadius: "3px" }}>
              <h5>
                Regulator History
            </h5>
            </div>
          </Col>

          <Col xs={6} >

            <Row >

              <Col>
                <button
                  onClick={() => setDisHisSev(true)}
                  type="submit"
                  style={{ fontSize: "11px", background: "#F8A316", color: "white", border: 'none', borderRadius: '2px' }}>
                  <i className="overview-icon pi pi-calendar" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
          Last 7 Day
        <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button type="submit" style={{
                  fontSize: "11px",
                  background: "#F8A316",
                  color: "white",
                  border: 'none',
                  borderRadius: '2px'
                }}
                  onClick={() => setDisHisThirty(true)}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
          Last 30 Day
        <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button
                  type="submit" style={{
                    fontSize: "11px",
                    background: "#F8A316",
                    color: "white",
                    border: 'none',
                    borderRadius: '2px'
                  }}
                  onClick={() => setDisHisOneYear(true)}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
          Last 1 Year
        <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button
                  type="submit"
                  style={{
                    fontSize: "11px",
                    background: "#F8A316",
                    color: "white",
                    border: 'none',
                    borderRadius: '2px'
                  }}
                  onClick={() => setDisHisOtherYear(true)}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
          Other Year
        <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
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
                onClick={() => onClick('grouping')}
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
                onClick={() => onClick('displayResponsive')}
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
                    onClick={() => onClick('PatternDistribution')}
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
              onClick={() => onClick('displayHistoryExport')}
            >

              Export/Download
                  </Button>
          </Col>

        </Row>


        <Row>            <Col>
          <HistoryTable
            data={state.data}
            selectData={selectData}
            selectedData={state.selectedData}
            filter={filter.globalFilter}
            grouping={grouping}
          />
        </Col>
        </Row>



      </Card>

      <FormHistory
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
        visible={grouping}
        onHide={() => onHide('grouping')}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <HistoryTable
          data={state.data}
          selectData={selectData}
          selectedData={state.selectedData}
          filter={filter.globalFilter}
          grouping={grouping}
        />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Distribution Analysis</span>}
        visible={displayResponsive}
        onHide={() => onHide('displayResponsive')}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DistributionTableHistory />
      </Dialog>


      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Pattern Distribution</span>}
        visible={patternDistribution}
        onHide={() => onHide('PatternDistribution')}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '80vw' }}>
        <PatternDistributionHistory />
      </Dialog>


      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Export Data</span>}
        visible={displayHistoryExport}
        onHide={() => onHide('displayHistoryExport')}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <ExportDataHistory />
      </Dialog>

      
      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Last 7 Day</span>}
        visible={disHisSev}
        onHide={handleDisHisSevenClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisHistoryLastSevDay />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Last 30 Day</span>}
        visible={disHisThirty}
        onHide={handleDisHisThirtyClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisHistoryLastThiMonth />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Last 1 Year</span>}
        visible={disHisOneYear}
        onHide={handleHisOneYearClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisHistoryOneYear />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color:'white'
        }}>Other Years</span>}
        visible={disHisOtherYear}
        onHide={handleDisHisOtherYearClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisHistoryOtherYears />
      </Dialog>
    </>


  )
}

export default HistoryModal;