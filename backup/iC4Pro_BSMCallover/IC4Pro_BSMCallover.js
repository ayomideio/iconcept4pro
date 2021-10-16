import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Dropdown,
  DropdownButton,
  NavDropdown,
  FormControl,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
  Modal,
  ButtonGroup,
  Card,
} from 'react-bootstrap';
import Form from './Form';
import Table from './Table';
import HistoryModal from './Modal/HistoryModal'
import ActivityModal from './Modal/ActivityModal'
import RecordsDeleteModal from './Modal/RecordsDeleteModal'
// import { Tooltip } from 'primereact/tooltip';
import calloverData from './Data/ic4pro_callover.json';
import { InputText } from 'primereact/inputtext';
import { Dropdown as Dropdowns } from 'primereact/dropdown';
// import AnalysisTable from './AnalyticTable/AnalysisTable';
import {Chart, Legend} from 'chart.js';

import 'primeflex/primeflex.css';
import ReactDOM from "react-dom";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import axios from 'axios'
import { useHistory } from 'react-router';
import iC4Pro_Session_Storage from '../../src/iC4Pro_Session_Storage'

const IC4Pro_BSMCallover = () => {
  const [state, setState] = useState({
    data: [...calloverData],
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

  const [grouping, setGrouping] = useState(false);

  const [title, setTitle] = useState(false);
  const [totalTrans, settotalTrans] = useState(0.00);
  const [totalCredit, settotalCredit] = useState(0.00);
  const [totalDebit, settotalDebit] = useState(0.00);
  const [transDifference, settransDifference] = useState(0.00);
  
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
  const reverseDate=(val)=>{
    

    var arr1 = val.split('/');
    var arr2 = arr1[2] +'-' +arr1[1]+'-' + arr1[0]
    
 
    return arr2
  }
  const selectData = useCallback((data) => {
  

    // alert(`dataaaaaaaaaaaaaa ${JSON.stringify(data)}`)


    data.GRP_BY_DATE=reverseDate(data.GRP_BY_DATE)
    localStorage.setItem("tokenbranch",data.IC4_BRANCH_CODE)
    localStorage.setItem("tokendate",data.GRP_BY_DATE)
    iC4Pro_Session_Storage.setName(data.PROFILE_NAME)
    // alert (iC4Pro_Session_Storage.getName())
  
    
    
   
      history.push('/ic4probsmcallover3')
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
         
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Need Help! Click Here
    </Tooltip>
  );
  let history=useHistory()
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  
 
  });
  async function getData (){
    let serverData=new FormData()
   
    if(JSON.stringify(iC4Pro_Session_Storage.getName()).length>1) {
      serverData.append("branchCode",localStorage.getItem("tokenbranch"))
      serverData.append("transactionDate",localStorage.getItem("tokendate"))
      serverData.append("transactionInputter",iC4Pro_Session_Storage.getName())
    }
    else{
    serverData.append("branchCode",localStorage.getItem("tokenbranch"))
    serverData.append("transactionDate",localStorage.getItem("tokendate"))
    
  }
		await axios.post("http://127.0.0.1:8000/callover/secondSummary/",serverData).then(res=>{
	
     
     
			var allcredittotalcall=0,allcredittotaldebit=0
      for (var i=0;i<res.data.alldata.length;i++){

        allcredittotalcall+=parseInt(res.data.alldata[i].CALL_CREDIT_TOTAL)
        allcredittotaldebit+=parseInt(res.data.alldata[i].CALL_DEBIT_TOTAL)
       
       
      }
      


      for (var i=0;i<res.data.alldata.length;i++){
        res.data.alldata[i].CALL_CREDIT_TOTAL=formatter.format(res.data.alldata[i].CALL_CREDIT_TOTAL).replace("NGN",'') 
        res.data.alldata[i].CALL_DEBIT_TOTAL=formatter.format(res.data.alldata[i].CALL_DEBIT_TOTAL).replace("NGN",'')
        res.data.alldata[i].GRP_BY_DATE=new Intl.DateTimeFormat('en-NG').format(new Date(res.data.alldata[i].GRP_BY_DATE))
        
    
       
        setState({data:res.data.alldata})
          
          

        settotalTrans(res.data.alldata.length)
        settotalCredit(formatter.format(allcredittotalcall).replace("NGN",''))
        settotalDebit(formatter.format( allcredittotaldebit).replace("NGN",''))
        settransDifference(formatter.format(allcredittotalcall-allcredittotaldebit).replace("NGN",''))
      }
		
		
      
      // alert(`formatttttttttttttttt                    ${formatter.format(2500).replace("NGN",'')}`) ;
		}).finally(()=>{
			// setLoading(false);
		})
		
	}
	useEffect(()=>{
    // const interval =setInterval(()=>
    // {
    //   if(allusersdropdown.length<1)
       
    // },1000)
    getData()
	},[]) 
  const handleBackClick =(evt)=>{
    iC4Pro_Session_Storage.setName('')
    history.push('/ic4procallover')
  } 
 
        return (
                <>

               

          <div className="card" style={{marginBottom:'0', border: "none"}}>
           <Row>
               <Col xs={4} >
                      <div style={{marginLeft:'0.5rem', background:"#C1C1C1", display: "inline-block", padding: "6px", paddingLeft:'2px', borderRadius:"3px"}}>
                      <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                        <h5 >
                          Next Screen of BSM Callover
                        </h5>
                        </OverlayTrigger>
                      </div>
              
                      
               </Col>
            <Col xs={8} >
             <Row > 
            <div style={{ width:"6.2rem"}}></div>
                     
            <Col style={{padding: '0'}}>
            <button  type="submit" style={{fontSize:"14px", float:'right', width:'7.5rem', background:"#66BB6A", color: "white", border:'none', borderRadius: '2px'}}>
            {/* <i className="overview-icon pi pi-inbox"  style={{'fontSize': '1em', color: "white", paddingRight: "0.2em"}}/> */}
            Total trans
            <br/>
            <small style={{fontSize:"12px",marginLeft:'8px', marginTop: '0.006em', color: "white", padding:"0"}}>{totalTrans}</small>
            </button>
            </Col>
            
            <Col style={{padding: '0'}}>
            <button type="submit" style={{fontSize:"14px", float:'right', width:'7.5rem', background:"#42A5F5", color: "white", border:'none', borderRadius: '2px'}}>
            {/* <i className="overview-icon pi pi-bookmark"  style={{'fontSize': '1em', color: "white", paddingRight: "0.2em"}}/> */}
            Total credit
            <br/>
            <small style={{fontSize:"12px",marginLeft:'8px', marginTop: '0.006em', color: "white", padding:"0"}}>{totalCredit}</small>
            </button>
            </Col>

            <Col style={{padding: '0'}}>
            <button type="submit" style={{fontSize:"14px", float:'right', width:'7.5rem', background:"#F8A316", color: "white", border:'none', borderRadius: '2px'}}
            >
            {/* <i className="overview-icon pi pi-bookmark"  style={{'fontSize': '1em', color: "white", paddingRight: "0.2em"}}/> */}
            Total debit
            <br/>
            <small style={{fontSize:"12px",marginLeft:'8px', marginTop: '0.006em', color: "white", padding:"0"}}>{totalDebit}</small>
            </button>
            </Col>

            <Col style={{paddingTop: '0', paddingBottom: '0', paddingLeft:'0', paddingRight:'10px'}}>
            <button type="submit" style={{fontSize:"14px", float:'right', width:'7.5rem', background:"#E63A3A", color: "white", border:'none', borderRadius: '2px'}}
             >
            {/* <i className="overview-icon pi pi-trash"  style={{'fontSize': '1em', color: "white", paddingRight: "0.2em"}}/> */}
            Difference
            <br/>
            <small style={{fontSize:"12px",marginLeft:'8px', marginTop: '0.006em', color: "white", padding:"0"}}>{transDifference}</small>
            </button>
            </Col>

            
          </Row>
                    
                    
             </Col>
               </Row> 
               </div>
          
        <div className="card" style={{paddingBottom:'0', marginLeft:'1.7rem', width:'74.5rem', padding:'0.2em', border: "none",marginBottom:'0'}}> 
          <div className="font-weight-bold" 
          style={{ backgroundColor:"#DFF0D8",   
          color:"black", padding:"1px", maxHeight:"1.5rem"}}> Record Information : 
          <span style={{color: '#787B78', fontSize: '13px'}}>
            The table below shows the following details </span></div>
          </div>
          
          <div className="card" style={{border: "none", }}> 
              <Row className="mb-3" xl  >
                <Col sm={6} lg={6} xl={4}>
    
                <ButtonGroup size="sm">
                <Button
                  size="sm"
                  name="create"
                  style={{backgroundColor: '#74C687', color:'#ffffff', border: 0,  width:'4rem', fontSize: '0.8em', height:'1.8rem', borderRadius:'4px',marginLeft:'0.5rem', marginRight:'0.5rem', padding:'2px 2px 2px 2px'}}
                  >
                    Callover
                </Button>
                  
                <Button
                  size="sm"
                  className="ml-2"
                  name="edit"
                  style={{ backgroundColor:'#237163', width:'4.9rem', border: 0,  fontSize: '0.8em', height:'1.8rem', marginRight:'0.5rem', borderRadius:'8px', padding:'2px 2px 2px 2px'}}
                  >
                    Classification
                </Button>
    
                <Button
                    size="sm"
                    className="ml-1"
                    name="view"
                    style={{backgroundColor:'#7E2506', width:'4.5rem', border: 0,  fontSize: '0.8em', height:'1.8rem', marginRight:'0.5rem', borderRadius:'8px', padding:'2px 2px 2px 2px'}} 
                  >
                    Distribution
                </Button>
    
                
    
                  <Dropdown as={ButtonGroup} 
                  className="ml-1"
                  style={{padding:"0", marginLeft:"0.1rem", border: 0, width:"18px"}} 
                  >
                    <Dropdown.Toggle 
                    variant="primary btn-md"
                    id="dropdown-basic"
                    style={{backgroundColor: 'purple', width:'3.6rem', fontSize: '0.7em', height:'1.8rem', borderRadius:'4px', border: 0,}}>
                      More</Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item>
                      <img src={require("../assets/layout/images/printer.png")} alt="print" />print</Dropdown.Item>
                    <Dropdown.Item
                    ><img src={require("../assets/layout/images/Excel-2013-icon.png")} tooltip="EXCEL" tooltipOptions={{ position: 'top' }} alt="EXCEL" />CSV</Dropdown.Item>
                    <Dropdown.Item> 
                      <img tooltip="EMAIL" tooltipOptions={{ position: 'top' }} href="https://www.flaticon.com/authors/pixel-perfect" src={require("../assets/layout/images/email.png")} alt="EMAIL" />Mail</Dropdown.Item>
                    <Dropdown.Item>
                      <img src={require("../assets/layout/images/pdf.png")} alt="PDF" />
                        PDF</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
    
    
                  <Button
                    size="sm"
                    className="ml-5"
                    name="view"
                    style={{backgroundColor:'#E63A3A', width:'4.5rem', border: 0,  fontSize: '0.8em', height:'1.8rem', marginLeft:'2.7rem', borderRadius:'8px', padding:'2px 2px 2px 2px'}} 
                    onClick={handleBackClick}
                  >
                    Back
                </Button>
                  
                </ButtonGroup>
                  
    
                
    
                </Col>
                

                <Col sm={6} lg={6} xl={3} className="ml-3">
                <h6>Branch Code: {state.data[0].IC4_BRANCH_CODE}</h6>
               
                </Col>
                <Col sm={6} lg={6} xl={3} className="ml-3">
                  <h6> Entry Date: {state.data[0].GRP_BY_DATE} </h6>
                
                </Col>


                <Col >
                <Button
                  size="sm"
                  className="ml-1"
                  style={{ width:'7rem', fontSize: '0.7em', float:'right', height:'1.8rem', backgroundColor: "#0000FF", border:'none' }}
                >
                 
                Export/Download
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
                    grouping={grouping}
                  />
                </Col>
              </Row>
              
              
            
          </div>
           
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
            
            // aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton={false} style={{backgroundColor:"#DFF0D8", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", display: "inline-block", padding: '2px'}}>
                FAIN History
              </Modal.Title>
              <Row>
                <div style={{marginRight: '4rem'}}>
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
                <HistoryModal/>
            </Modal.Body>
          </Modal>
    
          <Modal
            show={activityModal}
            onHide={handleActivityClose}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton={false} style={{backgroundColor:"#DFF0D8", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", display: "inline-block", padding: '2px'}}>
                FAIN Activity
              </Modal.Title>
              <Row>
                <div style={{marginRight: '4rem'}}>
                <Button
                  variant="success"
                  size="sm"
                  className="border border-white ml-1"
                  onClick={handleActivityClose}
                  style={{  maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
                >
                  Close
              </Button>
              </div>
              </Row>
            </Modal.Header>
            <Modal.Body>
                <ActivityModal/>
            </Modal.Body>
          </Modal>
    
          <Modal
            show={recordsDeleteModal}
            onHide={handleRecDelClose}
            dialogClassName="modal-90w" 
          >
            <Modal.Header closeButton={false} style={{backgroundColor:"#DFF0D8", padding:"0 0", color: '#EEF8F0'}}>
              <Modal.Title id="example-custom-modal-styling-title" style={{background:"#28A745", display: "inline-block", padding: '2px'}}>
                FAIN Deleted
              </Modal.Title>
              <Row>
                <div style={{marginRight: '4rem'}}>
                <Button
                  variant="success"
                  size="sm"
                  className="border border-white ml-1"
                  onClick={handleRecDelClose}
                  style={{  maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
                >
                  Close
              </Button>
              </div>
              </Row>
            </Modal.Header>
            <Modal.Body>
                <RecordsDeleteModal/>
            </Modal.Body>
          </Modal> 
        </>
  )
}

export default IC4Pro_BSMCallover;