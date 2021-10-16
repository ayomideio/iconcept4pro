import React, { useState, useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  Dropdown,
  ButtonGroup,
  Card,
} from 'react-bootstrap';
import FormActivty from '../FormActivty';
import ActivityTable from '../ActivtyTable';
import userActivityData from '../../Data/tempData/ic4pro_userActivity.json';
import { InputText } from 'primereact/inputtext';

const ActivityModal = () => {
  const [state, setState] = useState({
    data: [...userActivityData],
    showForm: false,
    selectedData: null,
    mode: null // Mode available: create, edit, view, delete
  });

  
  const [grouping, setGrouping] = useState(false);

  
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

<Card style={{border: "none"}}>
            <Row>
           <Col xs={6} >
                  <div style={{background:"#C1C1C1", width:"16rem", padding: "6px", borderRadius:"3px"}}>
                    <h5>
                    Operations Activity
                    </h5>
                  </div>
			
                  
           </Col>
           <Col xs={6} >
                <Row > 
                 
        <div style={{background:"#7E57C2", width:"8.2rem", height:'50px', marginLeft:'7.5rem'}} >
				<Row style={{marginLeft: "0.3rem"}}>
				<i className="overview-icon pi pi-calendar"  style={{'fontSize': '2em', color: "white"}}/>
                <h1 style={{fontSize:"16px", marginTop:'0.1rem', color: "white"}}>Today</h1>
				</Row>
				</div>

        <div style={{background:"#7E57C2", width:"8.3rem", height:'50px', marginLeft:'0.6rem'}}>
				<Row style={{marginLeft: "0.3rem"}}>
				<i className="overview-icon pi pi-calendar-plus"  style={{'fontSize': '2em', color: "white"}}/>
                <h1 style={{fontSize:"16px", marginTop:'0.1rem', color: "white"}}>7 Days</h1>
				</Row>
				</div>

                <div style={{background:"#7E57C2", width:"8.3rem", height:'50px', marginLeft:'0.6rem'}}>
				<Row style={{marginLeft: "0.3rem"}}>
				<i className="overview-icon pi pi-calendar-plus"  style={{'fontSize': '2em', color: "white"}}/>
                <h1 style={{fontSize:"16px", marginTop:'0.1rem', color: "white"}}>1 Month</h1>
				</Row>
				</div>

                <div style={{background:"#7E57C2", width:"8.3rem", height:'50px', marginLeft:'0.6rem'}}>
				<Row style={{marginLeft: "0.3rem"}}>
				<i className="overview-icon pi pi-calendar-plus"  style={{'fontSize': '2em', color: "white"}}/>
                <h1 style={{fontSize:"16px", marginTop:'0.1rem', color: "white"}}>1 Year</h1>
					</Row>
				</div>

                <div style={{background:"#7E57C2", width:"8.3rem", height:'50px', marginLeft:'0.6rem'}}>
				<Row style={{marginLeft: "0.3rem"}}>
				<i className="overview-icon pi pi-calendar-times"  style={{'fontSize': '2em', color: "white"}}/>
                <h1 style={{fontSize:"16px", marginTop:'0.1rem', color: "white"}}>1 Year +</h1>
				</Row>
				</div>
                </Row>

                
                
           </Col>
           </Row>
           </Card>
      
      <Card style={{border: "none"}}> 
      <div className="font-weight-bold" 
      style={{ backgroundColor:"#DFF0D8", marginTop:"-1rem", marginBottom:"1rem", 
      color:"black", padding:"1px", maxHeight:"1.5rem"}}> Record Information : 
      <span style={{color: '#787B78', fontSize: '13px'}}>
        The table below shows the following details </span></div>
 
           <Row className="mb-3" xl  >
                <Col sm={6} lg={8} xl={6}>
    
                <ButtonGroup size="sm">
                  
                <Button
                    variant="success"
                    size="sm"
                    className="ml-1"
                    name="view"
                    style={{width:'3.9rem', height:'2rem',borderRadius:'4px', padding:'2px 2px 2px 2px'}}
                    disabled={!state.selectedData}
                    onClick={handleForm}
                  >
                    <i className="pi pi-eye" style={{ 'fontSize': '1em' }}></i>
                View
                </Button>
    
    
                  <Dropdown as={ButtonGroup} 
                  className="ml-1  mr-3"
                  style={{marginLeft: "2px", padding:"0", border: 0, width:"18px"}} 
                  >
                    <Dropdown.Toggle 
                    variant="primary btn-md"
                    id="dropdown-basic"
                    style={{backgroundColor: 'purple', height:'2rem', borderRadius:'4px', border: 0,}}>
                      More</Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item
                    >
                      <img src={require("../../assets/layout/images/printer.png")} alt="print" />print</Dropdown.Item>
                    <Dropdown.Item
                    ><img src={require("../../assets/layout/images/Excel-2013-icon.png")} tooltip="EXCEL" tooltipOptions={{ position: 'top' }} alt="EXCEL" />CSV</Dropdown.Item>
                    <Dropdown.Item
                    > <img tooltip="EMAIL" tooltipOptions={{ position: 'top' }} href="https://www.flaticon.com/authors/pixel-perfect" src={require("../../assets/layout/images/email.png")} alt="EMAIL" />Mail</Dropdown.Item>
    
                    <Dropdown.Item
                    >
                      <img src={require("../../assets/layout/images/pdf.png")} alt="PDF" />
                        PDF</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
    
    
                  <Button
                    variant="info"
                    size="sm"
                    className="ml-5"
                    style={{marginLeft: "3.5rem", height:'2.1rem',borderRadius:'4px', padding:'2px 2px 2px 2px'}}
                    onClick={() => { setGrouping(!grouping) }}>
                    {`${grouping ? 'De-Grouping' : 'Grouping'}`}
                  </Button>

                  
                  
                </ButtonGroup>
                 
    
                
    
                </Col>
                <Col sm={6} lg={4} xl={4}>
               
                
                  <div className="d-flex" style={{marginRight: "3rem"}}>
                    <i className="pi pi-search search-icon" style={{ margin: '4px 4px 0 0' }}></i>
                    <InputText className="input-field" 
                    defaultValue={filter.globalFilter}
                    style={{ width: '15rem', paddingLeft:'2rem' }} 
                    type="search" onInput={(e) => setFilter({ globalFilter: e.target.value })} 
                    placeholder="Global Search" size="50" />
                  </div>
               
                </Col>
    
                <Col>
                <Button
                  size="sm"
                  
                  style={{ height: '2rem', backgroundColor: "gray", border:'none' }}
                >
                 
                COPY
              </Button>
                <Button
                  
                  size="sm"
                  
                  style={{marginLeft: "2px", height: '2rem', backgroundColor: "gray", border:'none' }}
                >
               
                CSV
              </Button>
                <Button
                
                  size="sm"
                  
                  style={{marginLeft: "2px", height: '2rem', backgroundColor: "gray", border:'none' }}
    
                >
               
                EXCEL
              </Button>
                <Button
                  size="sm"
                  
                  style={{marginLeft: "2px", height: '2rem', backgroundColor: "gray", border:'none' }}
    
                >
                  
                  PDF
              </Button>
                <Button
                  size="sm"
                  
                  style={{ marginLeft: "2px", height: '2rem', backgroundColor: "gray", border:'none' }}
                >
    
                  print
              </Button>
                </Col>
              </Row>


          <Row>
            <Col>
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

       
    </>

    
  )
}

export default ActivityModal;