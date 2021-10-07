import React, { useState, useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  Card
} from 'react-bootstrap';
import FormRecDel from '../FormRecDel';
import RecDelTable from '../RecDelTable';
import operationData from '../../Data/tempData/ic4pro_regulatorDataDel.json';
import { InputText } from 'primereact/inputtext';
import DistributionTableDelete from '../Analysis/RTN-DistributionDelete';
import { Dialog } from 'primereact/dialog';
import PatternDistributionDelete from '../Analysis/RTN-PatternDistributionDelete';
import ExportDataDel from '../ExportModal/iC4Pro_ExportsDelete';
import DisDeleteLastSevDay from '../Analysis/RTN-DistributionDeleteLastSevDay';
import DisDeleteLastThiMonth from '../Analysis/RTN-DistributionDeleteLastThirtyDay';
import DisDeleteOneYear from '../Analysis/RTN-DistributionDeleteLastOneYear';
import DisDeleteOtherYears from '../Analysis/RTN-DistributionHistoryOtherYears';




const RecordsDeleteModal = () => {
  const [state, setState] = useState({
    data: [...operationData],
    showForm: false,
    selectedData: null,
    mode: null // Mode available: create, edit, view, delete
  });


  const [grouping, setGrouping] = useState(false);
  const [expandTableModal, setExpandTableModal] = useState(false);

  const handleExpTableClose = () => setExpandTableModal(false);

  const [exportDataDel, setExportDataDel] = useState(false);

  const handleExportDataDelClose = () => setExportDataDel(false);


  const [patternDisDel, setPatternDisDel] = useState(false);
  const handlePatternDisDelClose = () => setPatternDisDel(false);

  const handleGroupClose = () => setGrouping(false);

  const [disDelSev, setDisDelSev] = useState(false);
  const handleDisDelSevenClose = () => setDisDelSev(false);

  const [disDelThirty, setDisDelThirty] = useState(false);
  const handleDisDelThirtyClose = () => setDisDelThirty(false);

  const [disDelOneYear, setDisDelOneYear] = useState(false);
  const handleDelOneYearClose = () => setDisDelOneYear(false);

  const [disDelOtherYear, setDisDelOtherYear] = useState(false);
  const handleDisDelOtherYearClose = () => setDisDelOtherYear(false);


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
          <Col xs={6} >
            <div style={{ background: "#C1C1C1", width: "19rem", padding: "6px", borderRadius: "3px" }}>
              <h5>
                Regulator Deleted Records
                    </h5>
            </div>


          </Col>

          <Col xs={6} >

            <Row >

              <Col>
                <button
                  onClick={() => setDisDelSev(true)}
                  type="submit" style={{ fontSize: "11px", background: "#E63A3A", color: "white", border: 'none', borderRadius: '2px' }}>
                  <i className="overview-icon pi pi-calendar" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
              Last 7 Day
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button
                  onClick={() => setDisDelThirty(true)}
                  type="submit" style={{ fontSize: "11px", background: "#E63A3A", color: "white", border: 'none', borderRadius: '2px' }}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
              Last 30 Day
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button
                  onCLick={() => setDisDelOneYear(true)}
                  type="submit" style={{ fontSize: "11px", background: "#E63A3A", color: "white", border: 'none', borderRadius: '2px' }}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
             Last 1 Year
            <br />
                  <small style={{ fontSize: "9px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>Record Assigned</small>
                </button>
              </Col>

              <Col>
                <button
                  onClick={() => setDisDelOtherYear(true)}
                  type="submit" style={{ fontSize: "11px", background: "#E63A3A", color: "white", border: 'none', borderRadius: '2px' }}>
                  <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} />
            Other Years
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
                  {/* <i className="overview-icon pi pi-calendar-plus" style={{ 'fontSize': '1em', color: "white", paddingRight: "0.2em" }} /> */}
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
          <Col sm={6} lg={8} xl={6}>

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
                    onClick={() => setPatternDisDel(true)}
                  >
                    1. Pattern and Distribution Analysis
                          </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>



            </ButtonGroup>


          </Col>
          <Col sm={6} lg={4} xl={4}>


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
              left: '73.6rem'
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
              onClick={() => setExportDataDel(true)}
            >

              Export/Download
                  </Button>
          </Col>

        </Row>


        <Row>
          <Col>
            <RecDelTable
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

      <FormRecDel
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
          color: 'white'
        }}>Distribution Analysis</span>}
        visible={expandTableModal}
        onHide={handleExpTableClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DistributionTableDelete />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue'
        }}>Export Data</span>}
        visible={exportDataDel}
        onHide={handleExportDataDelClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <ExportDataDel />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Classification Analysis</span>}
        visible={grouping}
        onHide={handleGroupClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <RecDelTable
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
          color: 'white'
        }}>Pattern and Distribution Analysis</span>}
        visible={patternDisDel}
        onHide={handlePatternDisDelClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <PatternDistributionDelete />
      </Dialog>



      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Last 7 Day</span>}
        visible={disDelSev}
        onHide={handleDisDelSevenClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisDeleteLastSevDay />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Last 30 Day</span>}
        visible={disDelThirty}
        onHide={handleDisDelThirtyClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisDeleteLastThiMonth />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Last 1 Year</span>}
        visible={disDelOneYear}
        onHide={handleDelOneYearClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisDeleteOneYear />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Other Years</span>}
        visible={disDelOtherYear}
        onHide={handleDisDelOtherYearClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DisDeleteOtherYears />
      </Dialog>
    </>
  )
}

export default RecordsDeleteModal;